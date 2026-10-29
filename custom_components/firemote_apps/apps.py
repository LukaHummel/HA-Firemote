"""Discover launcher apps and cache device-provided labels and icons."""

import asyncio
import json
import logging
import re
import shlex
import tempfile
from hashlib import sha256
from io import BytesIO
from pathlib import Path

_LOGGER = logging.getLogger(__name__)
PACKAGE = re.compile(r"^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+$")


def package_list(output):
    """Accept only package-manager package lines, never shell fragments."""
    return {
        line[8:].strip()
        for line in output.splitlines()
        if line.startswith("package:") and PACKAGE.fullmatch(line[8:].strip())
    }


def launcher_list(output):
    """Parse --brief component lines while ignoring headings and counts."""
    return {
        line.strip().split("/", 1)[0]
        for line in output.splitlines()
        if "/" in line and PACKAGE.fullmatch(line.strip().split("/", 1)[0])
    }


def extract_metadata(apk_path, package, icon_path):
    """Decode resources off the event loop; publish only normalized PNG images."""
    from androguard.core.apk import APK
    from PIL import Image

    apk = APK(str(apk_path))
    name = apk.get_app_name() or package
    if name.startswith("@"):
        name = package
    # Exclude anydpi adaptive XML icons in favor of a bitmap resource.
    icon = apk.get_app_icon(max_dpi=65533)
    if icon:
        data = apk.get_file(icon)
        if data:
            try:
                with Image.open(BytesIO(data)) as image:
                    image.thumbnail((192, 192))
                    image.convert("RGBA").save(icon_path, "PNG")
            except (OSError, ValueError):
                _LOGGER.debug("No decodable bitmap icon for %s", package)
    return name


class AppCatalog:
    """Serial discovery with persistent metadata and no retained APK files."""

    def __init__(self, cache_dir, icon_dir, url_prefix, executor):
        self.cache_dir = Path(cache_dir)
        self.icon_dir = Path(icon_dir)
        self.url_prefix = url_prefix
        self.executor = executor

    def _load(self):
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.icon_dir.mkdir(parents=True, exist_ok=True)
        try:
            return json.loads((self.cache_dir / "catalog.json").read_text())
        except (OSError, ValueError):
            return {}

    def _save(self, cache):
        path = self.cache_dir / "catalog.json"
        temporary = path.with_suffix(".tmp")
        temporary.write_text(json.dumps(cache))
        temporary.replace(path)
        keep = {item["icon_file"] for item in cache.values() if item.get("icon_file")}
        for icon in self.icon_dir.glob("*.png"):
            if icon.name not in keep:
                icon.unlink(missing_ok=True)

    async def _shell(self, device, command):
        return await asyncio.wait_for(device.adb_shell(command), timeout=30)

    async def scan(self, device, include_system_apps=False):
        installed = await self._shell(
            device, "pm list packages" + ("" if include_system_apps else " -3")
        )
        if not isinstance(installed, str) or not (
            installed.strip().startswith("package:") or not installed.strip()
        ):
            raise RuntimeError("Device did not return a package list")
        launchers = set()
        for category in (
            "android.intent.category.LEANBACK_LAUNCHER",
            "android.intent.category.LAUNCHER",
        ):
            output = await self._shell(
                device,
                "cmd package query-activities --brief -a android.intent.action.MAIN -c "
                + category,
            )
            if not isinstance(output, str) or re.search(
                r"unknown (?:command|option)|error:|not found|exception",
                output,
                re.IGNORECASE,
            ):
                # Older Fire OS versions expose the same operation through pm.
                output = await self._shell(
                    device,
                    "pm query-activities --brief -a android.intent.action.MAIN -c "
                    + category,
                )
            if not isinstance(output, str) or re.search(
                r"unknown (?:command|option)|error:|not found|exception",
                output,
                re.IGNORECASE,
            ):
                raise RuntimeError("Device does not support launcher app queries")
            launchers.update(launcher_list(output))
        packages = package_list(installed) & launchers
        previous = await self.executor(self._load)
        cache = {}
        apps = []
        for package in sorted(packages):
            paths = await self._shell(device, "pm path " + shlex.quote(package))
            paths = [
                line[8:].strip()
                for line in (paths or "").splitlines()
                if line.startswith("package:")
            ]
            apk_path = next(
                (path for path in paths if path.endswith("/base.apk")),
                paths[0] if paths else None,
            )
            if not apk_path:
                # A transient path lookup failure must not discard cached metadata.
                item = previous.get(package, {"name": package})
                cache[package] = item
                app = {"id": package, "name": item["name"]}
                if item.get("icon_file"):
                    app["icon"] = self.url_prefix + item["icon_file"]
                apps.append(app)
                continue
            fingerprint = sha256(
                (package + "\n" + "\n".join(paths)).encode()
            ).hexdigest()
            icon_file = fingerprint + ".png"
            icon_path = self.icon_dir / icon_file
            item = previous.get(package)
            missing_icon = (
                item
                and item.get("icon_file")
                and not await self.executor((self.icon_dir / item["icon_file"]).is_file)
            )
            if not item or item.get("fingerprint") != fingerprint or missing_icon:
                item = {"name": package, "fingerprint": fingerprint}
                temporary = await self.executor(
                    lambda: tempfile.TemporaryDirectory(dir=self.cache_dir)
                )
                try:
                    local_apk = Path(temporary.name) / "app.apk"
                    await asyncio.wait_for(
                        device.adb_pull(str(local_apk), apk_path), timeout=180
                    )
                    item["name"] = await self.executor(
                        extract_metadata, local_apk, package, icon_path
                    )
                    if await self.executor(icon_path.is_file):
                        item["icon_file"] = icon_file
                except (
                    Exception
                ):  # A single unreadable APK must not hide the other apps.
                    _LOGGER.warning(
                        "Could not extract metadata for %s", package, exc_info=True
                    )
                    # Retry failed extractions on the next refresh.
                    item.pop("fingerprint", None)
                finally:
                    await self.executor(temporary.cleanup)
            cache[package] = item
            app = {"id": package, "name": item["name"]}
            if item.get("icon_file"):
                app["icon"] = self.url_prefix + item["icon_file"]
            apps.append(app)
        await self.executor(self._save, cache)
        return sorted(apps, key=lambda app: app["name"].casefold())
