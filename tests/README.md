Run `node tests/run.mjs` with Node.js and Chromium installed. Set `CHROMIUM_BIN` if the browser has a different executable name or path.

The tests load the shipped modules and bundled Lit in headless Chromium with mock Home Assistant data. They check render suppression, relevant state updates, entity registry changes, configuration events, growing launcher dropdowns, catalog isolation, service dispatch, and all supported device models. They require no npm packages or local web server.

These tests do not connect to Home Assistant or send commands to real devices.

Run `node tests/run-viewport-scaling.mjs` for viewport height and width scaling checks, proportions across seven remote styles, launcher rows, resize handling, switching modes, editor configuration, and disconnect/reconnect cleanup. The same Chromium setup applies.
