"""Set up Firemote from Home Assistant's integration UI."""

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.selector import EntitySelector, EntitySelectorConfig

from .const import CONF_ENTITY, CONF_INCLUDE_SYSTEM, DOMAIN


def adb_entities(hass):
    """Only offer media players backed by the Android Debug Bridge integration."""
    return sorted(
        entry.entity_id
        for entry in er.async_get(hass).entities.values()
        if entry.platform == "androidtv" and entry.domain == "media_player"
    )


class FiremoteConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """One catalog per ADB media player."""

    VERSION = 1

    async def _create(self, user_input):
        entity_id = user_input[CONF_ENTITY]
        await self.async_set_unique_id(entity_id)
        self._abort_if_unique_id_configured()
        state = self.hass.states.get(entity_id)
        return self.async_create_entry(
            title=state.attributes.get("friendly_name", entity_id)
            if state
            else entity_id,
            data={
                CONF_ENTITY: entity_id,
                CONF_INCLUDE_SYSTEM: user_input.get(CONF_INCLUDE_SYSTEM, False),
            },
        )

    async def async_step_user(self, user_input=None):
        entities = adb_entities(self.hass)
        if not entities:
            return self.async_abort(reason="no_adb_entities")
        errors = {}
        if user_input is not None:
            if user_input[CONF_ENTITY] not in entities:
                errors[CONF_ENTITY] = "invalid_entity"
            else:
                return await self._create(user_input)
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_ENTITY): EntitySelector(
                        EntitySelectorConfig(
                            domain="media_player",
                            include_entities=entities,
                        )
                    ),
                    vol.Optional(CONF_INCLUDE_SYSTEM, default=False): bool,
                }
            ),
            errors=errors,
        )

    async def async_step_import(self, user_input):
        """Migrate existing YAML without creating duplicate sensors."""
        if user_input[CONF_ENTITY] not in adb_entities(self.hass):
            return self.async_abort(reason="invalid_entity")
        return await self._create(user_input)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return FiremoteOptionsFlow()


class FiremoteOptionsFlow(config_entries.OptionsFlow):
    """Change system-app filtering without editing YAML."""

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)
        include_system = self.config_entry.options.get(
            CONF_INCLUDE_SYSTEM, self.config_entry.data.get(CONF_INCLUDE_SYSTEM, False)
        )
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(CONF_INCLUDE_SYSTEM, default=include_system): bool,
                }
            ),
        )
