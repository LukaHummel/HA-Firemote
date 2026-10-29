"""Run with python3 -m unittest discover -s tests -p 'test_*.py'."""

import asyncio
import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location(
    "firemote_app_catalog",
    Path(__file__).parents[1] / "custom_components/firemote_apps/apps.py",
)
apps = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(apps)


class Device:
    def __init__(self):
        self.packages = [
            "com.example.cinema",
            "com.example.system",
            "com.example.service",
        ]
        self.pulls = 0
        self.commands = []
        self.version = "v1"
        self.fail = False

    async def adb_shell(self, command):
        self.commands.append(command)
        if self.fail:
            return None
        if command.startswith("pm list packages"):
            return "\n".join(
                "package:" + p
                for p in self.packages
                if not (command.endswith(" -3") and p.endswith("system"))
            )
        if "query-activities" in command:
            return "\n".join(
                p + "/.MainActivity" for p in self.packages if not p.endswith("service")
            )
        package = command.split()[-1]
        return f"package:/data/app/{self.version}/{package}/base.apk"

    async def adb_pull(self, local, remote):
        self.pulls += 1
        Path(local).write_bytes(b"fixture")


def metadata(local, package, icon):
    assert Path(local).read_bytes() == b"fixture"
    icon.write_bytes(b"png fixture")
    return "Cinema" if package.endswith("cinema") else "System app"


class CatalogTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.catalog = apps.AppCatalog(
            self.root / "cache", self.root / "icons", "/local/icons/", asyncio.to_thread
        )
        self.device = Device()
        self.patcher = patch.object(apps, "extract_metadata", side_effect=metadata)
        self.patcher.start()

    async def asyncTearDown(self):
        self.patcher.stop()
        self.temp.cleanup()

    async def test_default_excludes_system_and_nonlaunchable_apps(self):
        result = await self.catalog.scan(self.device)
        self.assertEqual([item["id"] for item in result], ["com.example.cinema"])
        self.assertEqual(result[0]["name"], "Cinema")
        self.assertTrue(result[0]["icon"].startswith("/local/icons/"))
        self.assertFalse(list(self.root.rglob("*.apk")))

    async def test_opt_in_system_apps(self):
        result = await self.catalog.scan(self.device, True)
        self.assertEqual(len(result), 2)

    async def test_cache_restart_update_and_removal(self):
        await self.catalog.scan(self.device)
        catalog = apps.AppCatalog(
            self.root / "cache", self.root / "icons", "/local/icons/", asyncio.to_thread
        )
        await catalog.scan(self.device)
        self.assertEqual(self.device.pulls, 1)
        self.device.version = "v2"
        await catalog.scan(self.device)
        self.assertEqual(self.device.pulls, 2)
        self.assertEqual(len(list((self.root / "icons").glob("*.png"))), 1)
        self.device.packages = []
        self.assertEqual(await catalog.scan(self.device), [])
        self.assertEqual(list((self.root / "icons").glob("*.png")), [])

    async def test_missing_cached_icon_is_extracted_again(self):
        await self.catalog.scan(self.device)
        for icon in (self.root / "icons").glob("*.png"):
            icon.unlink()
        result = await self.catalog.scan(self.device)
        self.assertIn("icon", result[0])
        self.assertEqual(self.device.pulls, 2)

    async def test_older_device_query_fallback(self):
        original = self.device.adb_shell

        async def shell(command):
            if command.startswith("cmd "):
                return "/system/bin/sh: cmd: not found"
            return await original(command)

        self.device.adb_shell = shell
        result = await self.catalog.scan(self.device)
        self.assertEqual(len(result), 1)
        self.assertTrue(
            any(
                command.startswith("pm query-activities")
                for command in self.device.commands
            )
        )

    async def test_connection_failure_preserves_cache(self):
        await self.catalog.scan(self.device)
        before = (self.root / "cache/catalog.json").read_text()
        self.device.fail = True
        with self.assertRaises(RuntimeError):
            await self.catalog.scan(self.device)
        self.assertEqual((self.root / "cache/catalog.json").read_text(), before)

    async def test_extraction_failure_falls_back_and_retries(self):
        with (
            self.assertLogs(apps._LOGGER, level="WARNING"),
            patch.object(apps, "extract_metadata", side_effect=ValueError("bad APK")),
        ):
            result = await self.catalog.scan(self.device)
        self.assertEqual(
            result, [{"id": "com.example.cinema", "name": "com.example.cinema"}]
        )
        self.assertFalse(list(self.root.rglob("*.apk")))
        result = await self.catalog.scan(self.device)
        self.assertEqual(result[0]["name"], "Cinema")
        self.assertEqual(self.device.pulls, 2)

    def test_parse_ignores_untrusted_shell_fragments(self):
        self.assertEqual(
            apps.package_list("package:com.good.app\npackage:com.bad;touch /tmp/x"),
            {"com.good.app"},
        )
        self.assertEqual(
            apps.launcher_list(
                "2 activities found:\ncom.good.app/.Main\ncom.bad;sh/.Main"
            ),
            {"com.good.app"},
        )


class ExtractionTests(unittest.TestCase):
    """Exercise resource selection without requiring APK parser dependencies."""

    def extract(self, icons, resources=None, attributes=None, files=None):
        import sys
        from types import SimpleNamespace

        resources = resources or []
        attributes = attributes or {}
        files = files or {"res/icon.png": b"bitmap"}

        class APK:
            def __init__(self, _):
                pass

            def get_app_name(self):
                return "Prime Video"

            def get_app_icon(self, max_dpi):
                return icons.get(max_dpi)

            def get_attribute_value(self, _, attribute):
                return attributes.get(attribute)

            def get_android_resources(self):
                return SimpleNamespace(get_resolved_res_configs=lambda _: resources)

            def get_file(self, filename):
                return files[filename]

        class Image:
            @staticmethod
            def open(stream):
                if stream.read() != b"bitmap":
                    raise OSError("Not a bitmap")
                return Image()

            def __enter__(self):
                return self

            def __exit__(self, *_):
                pass

            def thumbnail(self, _):
                pass

            def convert(self, _):
                return self

            def save(self, path, _):
                path.write_bytes(b"normalized PNG")

        with (
            tempfile.TemporaryDirectory() as temp,
            patch.dict(
                sys.modules,
                {
                    "androguard.core.apk": SimpleNamespace(APK=APK),
                    "PIL": SimpleNamespace(Image=Image),
                },
            ),
        ):
            icon = Path(temp) / "icon.png"
            name = apps.extract_metadata("fixture.apk", "com.amazon.video", icon)
            return name, icon.is_file()

    def test_nodpi_icon_is_not_excluded(self):
        self.assertEqual(
            self.extract({65533: None, 65536: "res/icon.png"}), ("Prime Video", True)
        )

    def test_xml_preference_falls_back_to_bitmap_resource(self):
        self.assertEqual(
            self.extract(
                {65533: "res/adaptive.xml", 65536: "res/adaptive.xml"},
                resources=[(None, "res/adaptive.xml"), (None, "res/icon.png")],
                attributes={"icon": "@7f010001"},
                files={"res/adaptive.xml": b"<xml>", "res/icon.png": b"bitmap"},
            ),
            ("Prime Video", True),
        )

    def test_tv_banner_is_used_when_icon_missing(self):
        self.assertEqual(
            self.extract({}, attributes={"banner": "res/icon.png"}),
            ("Prime Video", True),
        )

    def test_unreadable_icon_does_not_discard_display_name(self):
        self.assertEqual(self.extract({65533: "missing.png"}), ("Prime Video", False))


if __name__ == "__main__":
    unittest.main()
