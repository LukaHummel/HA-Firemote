"""Ensure the single install archive contains the complete runtime."""

import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class BundleTests(unittest.TestCase):
    def test_bundle_matches_shipped_modules(self):
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
                ):
                    self.assertIn(base + name, names)
                for source in (ROOT / "dist").rglob("*"):
                    if source.is_file():
                        bundled = (
                            base
                            + "frontend/"
                            + source.relative_to(ROOT / "dist").as_posix()
                        )
                        self.assertEqual(archive.read(bundled), source.read_bytes())
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
