Run `node tests/run.mjs` with Node.js and Chromium installed. Set `CHROMIUM_BIN` if the browser has a different executable name or path.

The tests load the integration’s bundled modules and bundled Lit in headless Chromium with mock Home Assistant data. They check render suppression, relevant state updates, entity registry changes, configuration events, growing launcher dropdowns, catalog isolation, service dispatch, and all supported device models. They require no npm packages or local web server.

These tests do not connect to Home Assistant or send commands to real devices.

Run `node tests/run-viewport-scaling.mjs` for viewport height and width scaling checks, proportions across seven remote styles, launcher rows, resize handling, switching modes, editor configuration, and disconnect/reconnect cleanup. The same Chromium setup applies.

Run `python3 -m unittest discover -s tests -p 'test_*.py'` for companion backend
catalog tests. These use a mocked ADB transport and APK extractor to verify
system-app filtering, launcher filtering, display names, caching across restarts,
package updates/removal, failed extraction retries, and transport failures. No
Home Assistant or third-party Python dependencies are needed for these tests.

The companion's real APK extractor additionally requires its manifest dependencies.
It has been checked with Androguard's `tests/data/APK/hello-world.apk` fixture,
resolving `HelloWorld` and a PNG icon. Live Home Assistant/TV verification remains
necessary; mocked transport tests do not certify device compatibility.

`python3 scripts/bundle.py --check` checks that the integration's frontend matches
`dist`. The Python suite also builds an archive in a temporary directory and
checks all runtime files are included, without Python caches. After frontend
edits, run `python3 scripts/bundle.py` before running the browser tests.

The setup-flow tests additionally need Home Assistant. To run them in isolation:

```sh
python3 -m venv /tmp/firemote-ha-tests
/tmp/firemote-ha-tests/bin/pip install -r tests/requirements-setup.txt
/tmp/firemote-ha-tests/bin/python -m unittest discover -s tests -p 'test_config_flow.py'
```

These exercise the real config-flow classes with mocked registries and entry
managers, covering ADB-only choices, system-app defaults, duplicate prevention,
YAML import, per-TV options, setup retries, platform forwarding and removal.
The dependency-free suite skips these tests; CI runs them separately with Home
Assistant installed. They do not connect to a TV.
