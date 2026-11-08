"""Execute the card's CEC guard with mocked Android shell commands."""

import os
from pathlib import Path
import re
import subprocess
import tempfile
import unittest


FRONTEND = Path(__file__).resolve().parents[1] / "custom_components/firemote_apps/frontend/HA-Firemote.js"


class CecVolumeCommandTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.log = self.directory / "calls"
        self.env = {
            **os.environ,
            "PATH": str(self.directory) + os.pathsep + os.environ["PATH"],
            "CEC_TEST_LOG": str(self.log),
        }
        guard = re.search(r"const ensureCECVolume = '([^']+)';", FRONTEND.read_text())
        self.assertIsNotNone(guard)
        self.guard = guard[1]
        self.script("cmd", '''
case "$*" in
  "hdmi_control cec_setting get volume_control_enabled")
    if [ "$CEC_TEST_STATE" = unavailable ]; then exit 1; fi
    echo "volume_control_enabled = $CEC_TEST_STATE" ;;
  "hdmi_control cec_setting set volume_control_enabled 1")
    echo enable >> "$CEC_TEST_LOG"
    exit "${CEC_TEST_SET_FAILURE:-0}" ;;
  *) exit 2 ;;
esac
''')
        self.script("input", 'echo "$*" >> "$CEC_TEST_LOG"\n')

    def script(self, name, body):
        path = self.directory / name
        path.write_text("#!/bin/sh\n" + body)
        path.chmod(0o700)

    def run_volume(self, state, key="KEYCODE_VOLUME_UP", set_failure=False):
        self.env.update(CEC_TEST_STATE=state, CEC_TEST_SET_FAILURE=str(int(set_failure)))
        subprocess.run(
            ["/bin/sh", "-c", self.guard + "input keyevent " + key],
            env=self.env, check=True, capture_output=True, text=True,
        )
        calls = self.log.read_text().splitlines()
        self.log.unlink()
        return calls

    def test_disabled_forwarding_is_enabled_before_each_volume_key(self):
        for key in ("KEYCODE_VOLUME_UP", "KEYCODE_VOLUME_DOWN", "KEYCODE_VOLUME_MUTE"):
            with self.subTest(key=key):
                self.assertEqual(self.run_volume("0", key), ["enable", "keyevent " + key])

    def test_enabled_forwarding_is_not_reconfigured(self):
        self.assertEqual(self.run_volume("1"), ["keyevent KEYCODE_VOLUME_UP"])

    def test_missing_setting_still_sends_volume_key(self):
        self.assertEqual(self.run_volume("unavailable"), ["keyevent KEYCODE_VOLUME_UP"])

    def test_failed_setting_write_still_sends_volume_key(self):
        self.assertEqual(self.run_volume("0", set_failure=True), ["enable", "keyevent KEYCODE_VOLUME_UP"])

    def test_setting_is_rechecked_after_it_is_disabled_again(self):
        self.run_volume("0")
        self.assertEqual(self.run_volume("1"), ["keyevent KEYCODE_VOLUME_UP"])
        self.assertEqual(self.run_volume("0"), ["enable", "keyevent KEYCODE_VOLUME_UP"])
