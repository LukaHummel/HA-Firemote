"""Device app discovery using the existing Android Debug Bridge integration."""

from pathlib import Path

import voluptuous as vol
from homeassistant.components.http import StaticPathConfig
from homeassistant.const import Platform
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er

from .const import CONF_ENTITY, CONF_INCLUDE_SYSTEM, DOMAIN

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Required("media_players"): vol.All(cv.ensure_list, [cv.entity_id]),
                vol.Optional("include_system_apps", default=False): cv.boolean,
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass, config):
    """Set up one app catalog sensor per configured ADB media player."""
    icon_directory = Path(hass.config.path("www", "firemote_apps"))
    await hass.async_add_executor_job(
        lambda: icon_directory.mkdir(parents=True, exist_ok=True)
    )
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                "/firemote/frontend", str(Path(__file__).parent / "frontend"), False
            ),
            StaticPathConfig("/firemote/icons", str(icon_directory), True),
        ]
    )
    if settings := config.get(DOMAIN):
        for entity_id in settings["media_players"]:
            hass.async_create_task(
                hass.config_entries.flow.async_init(
                    DOMAIN,
                    context={"source": "import"},
                    data={
                        CONF_ENTITY: entity_id,
                        CONF_INCLUDE_SYSTEM: settings[CONF_INCLUDE_SYSTEM],
                    },
                )
            )
    return True


async def async_setup_entry(hass, entry):
    """Set up a UI-configured TV after its ADB connection is initialized."""
    entity = er.async_get(hass).async_get(entry.data[CONF_ENTITY])
    adb_entry = (
        hass.config_entries.async_get_entry(entity.config_entry_id) if entity else None
    )
    if (
        not adb_entry
        or adb_entry.domain != "androidtv"
        or not getattr(getattr(adb_entry, "runtime_data", None), "aftv", None)
    ):
        raise ConfigEntryNotReady(
            "The selected Android Debug Bridge media player is not ready"
        )
    await hass.config_entries.async_forward_entry_setups(entry, [Platform.SENSOR])
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))
    return True


async def _async_options_updated(hass, entry):
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass, entry):
    """Remove the catalog sensor and its polling when the integration is removed."""
    return await hass.config_entries.async_unload_platforms(entry, [Platform.SENSOR])
