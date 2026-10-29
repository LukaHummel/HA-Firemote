# Working on HA-Firemote

## Project and source layout

This fork ships a Home Assistant **integration** containing the backend and the
Firemote dashboard card. HACS installs `custom_components/firemote_apps/` as one
package. The stable card resource is `/firemote/frontend/HA-Firemote.js`.

- `custom_components/firemote_apps/frontend/` is the single frontend source and
  deployed runtime. Edit it directly; do not recreate `dist/` or a second copy.
  ES modules and bundled Lit load through relative imports. There is no npm
  dependency installation, compilation, or development server step.
- `HA-Firemote.js` contains the card, editor, and device command dispatch.
  `app-catalog.js` owns catalog matching and app indexes; `remote-layouts.js`
  owns dashboard sizing; `remote-styles.js` owns static card CSS.
- `supported-devices.js` and `language-translations.js` hold device definitions
  and card translations. `launcher-buttons.js` retains legacy launcher data and
  artwork. `lit/` is vendored code; change it only for an intentional dependency
  update.
- Backend setup and static routes live in `__init__.py`, UI configuration in
  `config_flow.py`, sensor lifecycle in `sensor.py`, and discovery/extraction/cache
  logic in `apps.py`. Backend translations are separate from card translations:
  `strings.json` and `translations/en.json`.
- `scripts/bundle.py` stamps/checks the card version and optionally archives the
  integration. `build/` contains ignored output, not source.

## Frontend constraints

- Treat Home Assistant state snapshots, entity registries, app arrays, and config
  objects as immutable. WeakMap indexes depend on replacement identities. Keep
  configuration-derived data isolated between cards while sharing immutable
  snapshot indexes; avoid rescanning all states for each launcher.
- Normalize cloned editor configuration in `setConfig`/`configChanged`, not in
  render methods. A user edit should emit one `config-changed` event. Unrelated
  state updates intentionally skip rendering, so event handlers must obtain the
  current `hass` when invoked.
- Catalog resolution prefers the exact ADB media player, then an unambiguous
  shared device. Android / Fire TV must not fall back to running-process
  `source_list` when the catalog is missing or unavailable. Apple TV and Roku
  use their native source lists when no catalog matches.
- New launcher choices store `source:` plus a URI-encoded ID. Preserve package
  ID precedence, older display-name selections, safe malformed-escape handling,
  and legacy static/custom YAML launchers. The editor offers discovered apps;
  absence from its dropdown does not make legacy runtime data removable.
- Use Lit text/attribute/style bindings for user-provided values. Reserve
  `unsafeHTML` for trusted bundled markup. Reuse shared editor dropdowns and
  `launcherSlotCount` so lists remain bounded and saved selections survive edits.
- Use `_beginButtonInteraction`, `interaction.repeat`, and
  `interaction.onRelease` for press/hold behavior. Cancellation must clear timers
  and listeners on release outside the button, pointer cancellation, blur,
  configuration replacement, and disconnect. Raw input key-down commands need
  exactly one matching key-up. Preserve device-specific payloads and repeat
  timings when consolidating branches.
- `deviceAttributeQuery()` currently returns the literal string `"undefined"`
  for absent attributes of known devices. Command branches depend on this
  sentinel; changing it requires updating and testing all consumers together.
- Keep masonry and Sections dimensions in `remote-layouts.js`. Viewport scaling
  uses visible dashboard space across shadow roots, not the card's own growing
  bounds. Account for headers, sidebar, padding, launcher rows, and device names
  without resize feedback. Preserve icon proportions and text fallback on error.

## Backend constraints

Reuse the existing Android Debug Bridge connection rather than opening another.
Keep APK/resource work off the Home Assistant event loop, preserve per-TV cache
isolation, and clean up temporary APKs. Discovery filters launcher activities;
including system apps is a per-TV option. Runtime dependency changes must also
pass the separate Python 3.14 binary-install CI job; mocked extraction tests alone
cannot establish dependency compatibility.

## Validation and packaging

Choose the suites affected by the change; [tests/README.md](tests/README.md)
describes fixtures, optional dependencies, and coverage. From the repository root:

```sh
python3 scripts/bundle.py --check
python3 -m unittest discover -s tests -p 'test_*.py'
node tests/run.mjs
node tests/run-viewport-scaling.mjs
node tests/run.mjs catalog-layout.html
node tests/run.mjs editor.html
node tests/run.mjs commands.html
```

Browser tests need Node.js and Chromium/Chrome; set `CHROMIUM_BIN` when the
executable is not `chromium`. They use local files and mocked Home Assistant data,
with no server or real TV. Python discovery skips setup-flow tests without Home
Assistant; use the environment in `tests/README.md` to run them. CI exercises those
flows on Python 3.13 and runtime dependency installation separately on Python 3.14.

The integration's `manifest.json` controls `FiremoteFrontendVersion`. After an
intentional version change, run `python3 scripts/bundle.py` to stamp the frontend;
`--check` validates without modifying it. `HAFiremoteVersion` is the separate
upstream card version. Documentation-only edits do not need a version bump.

```sh
python3 scripts/bundle.py --check --zip build/firemote.zip
git diff --check
```

The ZIP contains the integration and LICENSE, excluding Python caches. Keep
archives and caches untracked. For documentation-only changes, check relative
links, referenced paths/commands, and whitespace; runtime suites need not rerun.
