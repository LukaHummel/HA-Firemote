"""Publish installed app metadata for the Firemote dashboard."""

import logging
from datetime import timedelta
from hashlib import sha256

from homeassistant.components.sensor import SensorEntity
from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_track_state_change_event

from .apps import AppCatalog
from .const import CONF_ENTITY, CONF_INCLUDE_SYSTEM

SCAN_INTERVAL = timedelta(minutes=5)
_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, entry, async_add_entities):
    async_add_entities(
        [
            FiremoteApps(
                hass,
                entry.data[CONF_ENTITY],
                entry.options.get(
                    CONF_INCLUDE_SYSTEM, entry.data.get(CONF_INCLUDE_SYSTEM, False)
                ),
            )
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
            f"/firemote/icons/{key}/",
            hass.async_add_executor_job,
        )

    @property
    def extra_state_attributes(self):
        return {
            "firemote_entity": self.source,
            "apps": self._apps,
            "include_system_apps": self.include_system_apps,
        }

    async def async_added_to_hass(self):
        """Refresh as soon as the shared ADB connection recovers."""
        await super().async_added_to_hass()
        self.async_on_remove(
            async_track_state_change_event(
                self.hass, [self.source], self._async_source_changed
            )
        )
        # The first scan runs before the entity is added. ADB may have recovered
        # during that scan, before our state listener was registered.
        source = self.hass.states.get(self.source)
        if not self.available and self._source_available(source):
            self.async_schedule_update_ha_state(force_refresh=True)

    @staticmethod
    def _source_available(state):
        return state is not None and state.state not in (
            STATE_UNAVAILABLE,
            STATE_UNKNOWN,
        )

    @callback
    def _async_source_changed(self, event):
        """Handle connection changes without scanning on playback updates."""
        if not self._source_available(event.data.get("new_state")):
            self._attr_available = False
            self.async_write_ha_state()
        elif not self._source_available(event.data.get("old_state")):
            self.async_schedule_update_ha_state(force_refresh=True)

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
        self._attr_available = device.available
