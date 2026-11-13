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
from struct import error as StructError

from .apk_resources import resolve_string

_LOGGER = logging.getLogger(__name__)
PACKAGE = re.compile(r"^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)+$")


def package_list(output):
    """Accept only package-manager package lines, never shell fragments."""
    return set(package_versions(output))


def package_versions(output):
    """Read optional version codes without treating pm output as shell input."""
    packages = {}
    for line in output.splitlines():
        if not line.startswith("package:"):
            continue
        fields = line[8:].strip().split()
        if not fields or not PACKAGE.fullmatch(fields[0]):
            continue
        if len(fields) == 1:
            packages[fields[0]] = ""
        elif len(fields) == 2 and re.fullmatch(r"versionCode:\d+", fields[1]):
            packages[fields[0]] = fields[1]
    return packages


def launcher_list(output):
    """Parse --brief component lines while ignoring headings and counts."""
    return {
        line.strip().split("/", 1)[0]
        for line in output.splitlines()
        if "/" in line and PACKAGE.fullmatch(line.strip().split("/", 1)[0])
    }


def extract_metadata(apk_path, package, icon_path):
    """Decode resources off the event loop; publish only normalized PNG images."""
    from PIL import Image
    from pyaxmlparser import APK

    apk = APK(str(apk_path))
    label = apk.get_attribute_value("application", "label")
    if label is None:
        activity = apk.get_main_activity()
        label = (
            apk.get_attribute_value("activity", "label", name=activity)
            if activity
            else None
        )
    name = label or package
    if name.startswith("@"):
        name = package
        try:
            reference = label[1:].split(":")
            if len(reference) == 1 or reference[0] == package:
                name = (
                    resolve_string(
                        apk.get_file("resources.arsc"), int(reference[-1], 16)
                    )
                    or package
                )
        except (
            ValueError,
            IndexError,
            StopIteration,
            StructError,
            KeyError,
            TypeError,
        ):
            _LOGGER.debug("Could not resolve app label for %s", package, exc_info=True)
    candidates = []
    # First prefer legacy bitmap densities, then include nodpi and adaptive icons.
    for density in (65533, 65536):
        try:
            candidates.append(apk.get_app_icon(max_dpi=density))
        except Exception:
            _LOGGER.debug("Could not resolve app icon for %s", package, exc_info=True)
    # A single highest-density resource may be XML while lower densities are PNG.
    # TV apps may supply a bitmap banner instead of a traditional app icon.
    for attribute in ("icon", "banner"):
        try:
            resource = apk.get_attribute_value("application", attribute)
            if not resource:
                continue
            if not resource.startswith("@"):
                candidates.append(resource)
                continue
            resources = apk.get_android_resources()
            if resources:
                resource_id = int(resource.split(":")[-1].lstrip("@"), 16)
                candidates.extend(
                    path for _, path in resources.get_resolved_res_configs(resource_id)
                )
        except Exception:
            _LOGGER.debug(
                "Could not resolve %s resources for %s",
                attribute,
                package,
                exc_info=True,
            )
    for icon in dict.fromkeys(
        candidate for candidate in candidates if isinstance(candidate, str)
    ):
        try:
            data = apk.get_file(icon)
            if not data:
                continue
            with Image.open(BytesIO(data)) as image:
                image.thumbnail((192, 192))
                image.convert("RGBA").save(icon_path, "PNG")
            break
        except Exception:
            # A failed encoder can leave a partial PNG. It must never become a
            # replacement for a known-good cached icon.
            icon_path.unlink(missing_ok=True)
            _LOGGER.debug(
                "No decodable bitmap at %s in %s", icon, package, exc_info=True
            )
    if not icon_path.is_file():
        _LOGGER.debug("No bitmap icon or TV banner found for %s", package)
    return name


class AppCatalog:
    """Serial discovery with persistent metadata and no retained APK files."""

    def __init__(self, cache_dir, icon_dir, url_prefix, executor):
        self.cache_dir = Path(cache_dir)
        self.icon_dir = Path(icon_dir)
        self.url_prefix = url_prefix
        self.executor = executor
        self._scan_lock = asyncio.Lock()

    def _load(self):
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.icon_dir.mkdir(parents=True, exist_ok=True)
        try:
            return json.loads((self.cache_dir / "catalog.json").read_text())
        except (OSError, ValueError):
            return {}

    def _save(self, cache, installed=None, include_system_apps=False):
        # Retain every learned icon: saved launchers on other dashboards may still
        # reference an older URL, even after an app is removed or filtered out.
        history = {**self._load(), **cache}
        path = self.cache_dir / "catalog.json"
        temporary = path.with_suffix(".tmp")
        temporary.write_text(json.dumps(history))
        temporary.replace(path)
        if installed is not None:
            snapshot = self.cache_dir / "installed.json"
            temporary = snapshot.with_suffix(".tmp")
            temporary.write_text(
                json.dumps(
                    {
                        "include_system_apps": include_system_apps,
                        "apps": installed,
                    }
                )
            )
            temporary.replace(snapshot)

    def _read_cache(self, include_system_apps):
        history = self._load()
        cached = []
        for package, item in history.items():
            app = {"id": package, "name": item["name"]}
            if item.get("icon_file"):
                app["icon"] = self.url_prefix + item["icon_file"]
            cached.append(app)
        try:
            snapshot = json.loads((self.cache_dir / "installed.json").read_text())
            installed = (
                snapshot["apps"]
                if snapshot["include_system_apps"] == include_system_apps
                else []
            )
        except (OSError, ValueError, KeyError):
            installed = []
        return installed, cached

    async def read_cache(self, include_system_apps=False):
        async with self._scan_lock:
            return await self.executor(self._read_cache, include_system_apps)

    def _publish_icon(self, candidate, previous):
        """Compare decoded image bytes before publishing an immutable icon URL."""
        data = candidate.read_bytes()
        old = previous.get("icon_file") if previous else None
        if old:
            try:
                if (self.icon_dir / old).read_bytes() == data:
                    return old
            except FileNotFoundError:
                pass
        filename = sha256(data).hexdigest() + ".png"
        destination = self.icon_dir / filename
        if not destination.exists():
            temporary = destination.with_suffix(".tmp")
            temporary.write_bytes(data)
            temporary.replace(destination)
        return filename

    async def _shell(self, device, command):
        return await asyncio.wait_for(device.adb_shell(command), timeout=30)

    async def scan(self, device, include_system_apps=False):
        # Polls and explicit refreshes share the same cache and temporary filename.
        async with self._scan_lock:
            return await self._scan(device, include_system_apps)

    async def _scan(self, device, include_system_apps):
        if not device.available:
            raise RuntimeError("ADB is unavailable")
        package_command = "pm list packages" + ("" if include_system_apps else " -3")
        installed = await self._shell(device, package_command + " --show-versioncode")
        if isinstance(installed, str) and re.search(
            r"unknown (?:command|option)|error:", installed, re.IGNORECASE
        ):
            # Older Fire OS versions do not expose package version codes.
            installed = await self._shell(device, package_command)
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
        versions = package_versions(installed)
        packages = versions.keys() & launchers
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
                (
                    f"metadata-v5\n{package}\n{versions[package]}\n" + "\n".join(paths)
                ).encode()
            ).hexdigest()
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
                    icon_path = Path(temporary.name) / "icon.png"
                    await asyncio.wait_for(
                        device.adb_pull(str(local_apk), apk_path), timeout=180
                    )
                    item["name"] = await self.executor(
                        extract_metadata, local_apk, package, icon_path
                    )
                    if not device.available:
                        raise RuntimeError(
                            "ADB disconnected during metadata extraction"
                        )
                    if await self.executor(icon_path.is_file):
                        item["icon_file"] = await self.executor(
                            self._publish_icon, icon_path, previous.get(package)
                        )
                    elif previous.get(package, {}).get("icon_file"):
                        item["icon_file"] = previous[package]["icon_file"]
                        item.pop("fingerprint", None)
                except (
                    Exception
                ):  # A single unreadable APK must not hide the other apps.
                    _LOGGER.warning(
                        "Could not extract metadata for %s", package, exc_info=True
                    )
                    # Keep the last good label/icon while retrying an updated APK.
                    item = dict(previous.get(package, item))
                    # Retry failed extractions on the next refresh.
                    item.pop("fingerprint", None)
                finally:
                    await self.executor(temporary.cleanup)
            cache[package] = item
            app = {"id": package, "name": item["name"]}
            if item.get("icon_file"):
                app["icon"] = self.url_prefix + item["icon_file"]
            apps.append(app)
        if not device.available:
            raise RuntimeError("ADB disconnected during app discovery")
        apps = sorted(apps, key=lambda app: app["name"].casefold())
        await self.executor(self._save, cache, apps, include_system_apps)
        return apps
