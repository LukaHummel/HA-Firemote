"""Ensure the single install archive contains the complete runtime."""

import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "custom_components" / "firemote_apps" / "frontend"


class BundleTests(unittest.TestCase):
    def test_frontend_version_matches_manifest(self):
        subprocess.run(
            [sys.executable, str(ROOT / "scripts/bundle.py"), "--check"],
            check=True,
            capture_output=True,
        )

    def test_install_archive_is_self_contained(self):
        with tempfile.TemporaryDirectory() as temporary:
            output = Path(temporary) / "firemote.zip"
            subprocess.run(
                [
                    sys.executable,
                    str(ROOT / "scripts/bundle.py"),
                    "--check",
                    "--zip",
                    str(output),
                ],
                check=True,
                capture_output=True,
            )
            with zipfile.ZipFile(output) as archive:
                names = set(archive.namelist())
                base = "custom_components/firemote_apps/"
                for name in (
                    "__init__.py",
                    "sensor.py",
                    "apps.py",
                    "manifest.json",
                    "README.md",
                    "frontend/HA-Firemote.js",
                    "frontend/app-catalog.js",
                    "frontend/remote-layouts.js",
                    "frontend/remote-styles.js",
                    "frontend/launcher-buttons.js",
                    "frontend/language-translations.js",
                    "frontend/supported-devices.js",
                    "frontend/lit/lit-all.min.js",
                    "frontend/lit/lit-all.min.js.map",
                ):
                    self.assertIn(base + name, names)
                for source in FRONTEND.rglob("*"):
                    if source.is_file():
                        bundled = (
                            base
                            + "frontend/"
                            + source.relative_to(FRONTEND).as_posix()
                        )
                        self.assertEqual(archive.read(bundled), source.read_bytes())
                self.assertEqual(archive.read("LICENSE"), (ROOT / "LICENSE").read_bytes())
                self.assertFalse(
                    any(
                        "__pycache__" in name or name.endswith(".pyc") for name in names
                    )
                )
                self.assertTrue(
                    all(
                        not name.startswith("/") and ".." not in Path(name).parts
                        for name in names
                    )
                )

    def make_isolated_project(self, directory, frontend):
        root = Path(directory)
        script = root / "scripts" / "bundle.py"
        script.parent.mkdir()
        script.write_bytes((ROOT / "scripts" / "bundle.py").read_bytes())
        component = root / "custom_components" / "firemote_apps"
        entrypoint = component / "frontend" / "HA-Firemote.js"
        entrypoint.parent.mkdir(parents=True)
        (component / "manifest.json").write_text('{"version": "1.2.3"}\n')
        entrypoint.write_text(frontend)
        return root, entrypoint

    def run_bundle(self, root, *arguments):
        return subprocess.run(
            [sys.executable, str(root / "scripts" / "bundle.py"), *arguments],
            capture_output=True,
            text=True,
        )

    def test_check_rejects_stale_version_without_modifying_source(self):
        frontend = "const FiremoteFrontendVersion = '0.1.0';\nexport const card = {};\n"
        with tempfile.TemporaryDirectory() as temporary:
            root, entrypoint = self.make_isolated_project(temporary, frontend)
            output = root / "firemote.zip"
            result = self.run_bundle(root, "--check", "--zip", str(output))
            self.assertNotEqual(result.returncode, 0)
            self.assertEqual(entrypoint.read_text(), frontend)
            self.assertFalse(output.exists())

    def test_stamp_updates_canonical_frontend_without_creating_a_copy(self):
        frontend = "const FiremoteFrontendVersion = '0.1.0';\nexport const card = {};\n"
        with tempfile.TemporaryDirectory() as temporary:
            root, entrypoint = self.make_isolated_project(temporary, frontend)
            result = self.run_bundle(root)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(
                entrypoint.read_text(),
                "const FiremoteFrontendVersion = '1.2.3';\nexport const card = {};\n",
            )
            self.assertFalse((root / "dist").exists())

    def test_invalid_version_declaration_is_rejected_without_changes(self):
        for frontend in (
            "export const card = {};\n",
            "const FiremoteFrontendVersion = '0.1.0';\n" * 2,
        ):
            with (
                self.subTest(frontend=frontend),
                tempfile.TemporaryDirectory() as temporary,
            ):
                root, entrypoint = self.make_isolated_project(temporary, frontend)
                result = self.run_bundle(root)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(entrypoint.read_text(), frontend)
