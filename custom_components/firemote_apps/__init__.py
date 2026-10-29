"""Device app discovery using the existing Android Debug Bridge integration."""

from pathlib import Path

import voluptuous as vol
from homeassistant.components.http import StaticPathConfig
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import discovery

DOMAIN = "firemote_apps"
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
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                "/firemote/frontend", str(Path(__file__).parent / "frontend"), False
            )
        ]
    )
    await discovery.async_load_platform(hass, "sensor", DOMAIN, config[DOMAIN], config)
    return True
