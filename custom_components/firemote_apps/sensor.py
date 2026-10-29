"""Publish installed app metadata for the Firemote dashboard."""

import logging
from datetime import timedelta
from hashlib import sha256

from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers import entity_registry as er

from .apps import AppCatalog

SCAN_INTERVAL = timedelta(hours=6)
_LOGGER = logging.getLogger(__name__)


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    if discovery_info is None:
        return
    async_add_entities(
        [
            FiremoteApps(hass, entity_id, discovery_info["include_system_apps"])
            for entity_id in discovery_info["media_players"]
        ],
        True,
    )


class FiremoteApps(SensorEntity):
    """Use the ADB integration's authenticated connection and transport lock."""

    _attr_icon = "mdi:apps"

    def __init__(self, hass, source, include_system_apps):
        self.hass = hass
        self.source = source
        self.include_system_apps = include_system_apps
        self._attr_name = f"Firemote apps {source.split('.', 1)[1]}"
        self._attr_unique_id = f"firemote_apps_{source}"
        self._attr_available = False
        self._apps = []
        key = sha256(source.encode()).hexdigest()[:16]
        self.catalog = AppCatalog(
            hass.config.path(".storage", "firemote_apps", key),
            hass.config.path("www", "firemote_apps", key),
            f"/local/firemote_apps/{key}/",
            hass.async_add_executor_job,
        )

    @property
    def extra_state_attributes(self):
        return {
            "firemote_entity": self.source,
            "apps": self._apps,
            "include_system_apps": self.include_system_apps,
        }

    async def async_update(self):
        entry = er.async_get(self.hass).async_get(self.source)
        config_entry = (
            self.hass.config_entries.async_get_entry(entry.config_entry_id)
            if entry
            else None
        )
        runtime = getattr(config_entry, "runtime_data", None)
        device = getattr(runtime, "aftv", None)
        if (
            not config_entry
            or config_entry.domain != "androidtv"
            or device is None
            or not device.available
        ):
            self._attr_available = False
            return
        try:
            self._apps = await self.catalog.scan(device, self.include_system_apps)
        except Exception:
            self._attr_available = False
            _LOGGER.warning(
                "Unable to refresh app list for %s", self.source, exc_info=True
            )
            return
        self._attr_native_value = len(self._apps)
        self._attr_available = True
