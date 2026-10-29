# Firemote bundled integration and dashboard card

This package includes the Home Assistant backend and the Firemote dashboard card.
The backend discovers launchable installed Android / Fire
TV apps, reads their display names and bitmap icons from their APK resources, and
publishes a catalog sensor. It reuses the Android Debug Bridge integration's
connection. The card discovers the matching sensor automatically; no extra card
configuration is needed. The launcher dropdowns show names, store package IDs,
and only selected apps appear on the remote.

## Install

1. Configure Home Assistant's **Android Debug Bridge** integration for the TV and
   confirm its media player can launch apps. Android TV Remote alone is insufficient.
2. In HACS, open **Custom repositories**, add
   `https://github.com/LukaHummel/HA-Firemote` with type **Integration**, then
   download **Firemote**. HACS installs the backend and bundled card together.
   Alternatively, extract `firemote.zip` into `/config/`, or copy the entire
   `firemote_apps` directory into `/config/custom_components/firemote_apps/`.
3. Restart Home Assistant so it loads the integration and its dependencies.
4. Open **Settings → Devices & services → Add Integration → Firemote**.
   Select the Android Debug Bridge media player for your TV. Leave **Include
   system apps** off to list only downloaded apps, or enable it to include
   preinstalled apps. Submit the form. The first scan may take several minutes.
5. In **Settings → Dashboards → Resources**, add
   `/firemote/frontend/HA-Firemote.js` with type **JavaScript Module**.
   If you previously installed the standalone card, remove its old resource entry
   so the custom element is not loaded twice. For YAML-managed resources:

   ```yaml
   lovelace:
     resources:
       - url: /firemote/frontend/HA-Firemote.js
         type: module
   ```

6. Reload the dashboard, add a `custom:firemote-card` card, and select apps for its
   launcher slots in the editor. Backend and frontend updates now come from the
   same integration folder; update through HACS and restart Home Assistant.

If this repository is already registered in HACS as a Dashboard repository,
remove that old HACS repository entry and add it again as **Integration**. Remove
its old dashboard resource and use the bundled URL above. Keep your card YAML;
there is no automatic conversion of the existing HACS category. This fork is a
custom repository and is separate from the upstream Firemote Dashboard listing.

## Existing YAML installations

Existing `firemote_apps:` YAML is imported automatically into one integration
entry per TV. Sensor unique IDs and the icon cache are preserved. Once the
entries appear under Devices & services, remove the old YAML block so removing
an integration later does not re-import it at the next restart. You do not need
to add the same TV again through the setup screen.

Add Firemote again to configure another TV. Duplicate setup for the same media
player is prevented. Removing an entry removes its sensor and polling; it does
not delete the TV's cached images or the shared dashboard files.

## Build the bundle

From the repository root, run:

```sh
python3 scripts/bundle.py --zip build/firemote.zip
```

The archive contains `custom_components/firemote_apps/` with all Python code and
frontend dependencies. Extracting it into the Home Assistant configuration
folder installs both parts. After changing `dist`, run `python3 scripts/bundle.py`
to refresh the packaged frontend; CI checks that the copies match.

Each device gets a sensor named `Firemote apps <entity name>`. Discovery refreshes
every six hours. Use `homeassistant.update_entity` on that sensor to refresh after
installing or removing apps. Unreachable devices mark the sensor unavailable;
the card does not substitute a running-app list for an unavailable installed-app
catalog.

## Filtering and caching

Only installed apps with a MAIN/LAUNCHER or MAIN/LEANBACK_LAUNCHER activity are
included. System packages are excluded by default (`pm list packages -3`). Some
preinstalled streaming apps count as system apps: enable **Include system apps**
in the integration's **Configure** options to include them. Each TV has its own
setting, and changes reload that TV's catalog automatically.

APK files are downloaded one at a time to temporary storage and deleted after
extraction. Labels and APK path fingerprints are cached under
`/config/.storage/firemote_apps/`. Normal package updates change the APK paths and
trigger extraction again. To force re-extraction after an in-place APK change,
stop Home Assistant, remove that cache directory, and restart.

Icons are normalized to PNG, at most 192 × 192 pixels, under
`/config/www/firemote_apps/` and served through the integration’s explicitly
registered `/firemote/icons/` route. These
static icon files are accessible without Home Assistant authentication, like
other files in `www`; no APKs or credentials are served. Uninstalled apps' icons
are removed on a successful scan. Remove both directories to erase the cache.

Icon extraction checks all bitmap resource variants and TV banners rather than
only the preferred density. Missing labels fall back to package IDs.
Adaptive/vector-only icons, resources
stored solely in split APKs, and unreadable APKs may fall back to text; this version
does not render Android vector drawables. No hardcoded app catalog is used.

## Compatibility

The backend targets Home Assistant versions whose Android Debug Bridge config
entries expose `runtime_data.aftv`. It uses that integration's internal runtime
connection (rather than opening a second connection); future Home Assistant
changes may require an update. The device must support `cmd package
query-activities` or `pm query-activities`. It does not support Roku or Apple TV.

The backend has automated transport/cache/parser tests, but must still be checked
against your Home Assistant installation and TV. No real TV is needed for the
repository's test suite.

## Missing icons

After upgrading to 0.1.1, restart Home Assistant and reload the dashboard. The new
extractor automatically invalidates the old metadata cache on its first scan;
there is no need to delete it manually. Existing selections stored by display
name (for example `Prime Video`) now resolve to the matching catalog package and
icon as well.

If a button still shows only text, inspect the matching catalog sensor in
**Developer Tools → States**. Its `apps` entry should include `id`, `name`, and
`icon`. Open the `icon` path on your Home Assistant server to check image serving.
A missing `icon` field means no usable bitmap was extracted. A failed image URL
means an image-serving problem. Check Home Assistant logs for extraction failures;
vector-only icons and resources held only in split APKs still fall back to text.

## Setup flow fails with RequirementsNotFound

Version 0.2.1 replaces `androguard==4.1.3` with the lightweight APK resource parser
`pyaxmlparser==0.3.31`. The former dependency could prevent Home Assistant from
loading the setup flow at all. Upgrade the integration through HACS and restart
Home Assistant before adding Firemote again; a dashboard refresh alone does not
reload the backend manifest. No manual package installation inside Home
Assistant is needed.

The replacement parser is checked in a clean Python 3.14 environment. Discovery,
app display names, bitmap icons, and TV-banner fallback are retained. Metadata
is re-extracted automatically once after the upgrade.

## Catalog exists but the card lists system processes

The card automatically selects the catalog belonging to its selected ADB
media-player entity. Changing that entity switches the catalog, app names, and
icons together. If using a different media-player integration for the same TV,
a unique catalog on the same Home Assistant device can also match automatically.
There is no separate catalog selector. Old `app_catalog_entity` overrides are
ignored and removed when editing the card.

If no catalog matches, configure Firemote and the card with the same ADB
media-player entity. The editor reports the matched ADB entity and filter setting.
Selected apps launch through the matched catalog's ADB entity.

On Android / Fire TV, a missing catalog now produces a status message and empty
launcher choices. The card no longer silently substitutes `source_list`, which
can contain system processes and has no device-icon metadata. Roku and Apple TV
continue using their integration-provided source lists.

After updating, reload the dashboard and verify that its resource is
`/firemote/frontend/HA-Firemote.js`, with any old HACS dashboard resource removed.
Existing launcher selections made from the raw process list may need reselecting
from the installed-app catalog.
