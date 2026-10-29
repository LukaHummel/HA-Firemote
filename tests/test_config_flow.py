"""UI setup tests. Run with Home Assistant installed (see tests/README.md)."""

import importlib.util
import unittest
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

HAS_HA = importlib.util.find_spec("homeassistant") is not None
if HAS_HA:
    from homeassistant.const import Platform
    from homeassistant.data_entry_flow import AbortFlow
    from homeassistant.exceptions import ConfigEntryNotReady

    from custom_components.firemote_apps import (
        _async_options_updated,
        async_setup,
        async_setup_entry,
        async_unload_entry,
    )
    from custom_components.firemote_apps.config_flow import (
        FiremoteConfigFlow,
        FiremoteOptionsFlow,
    )
    from custom_components.firemote_apps.const import DOMAIN
    from custom_components.firemote_apps.sensor import async_setup_entry as setup_sensor


@unittest.skipUnless(HAS_HA, "Install Home Assistant to run setup-flow tests")
class SetupFlowTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.hass = Mock()
        self.hass.config_entries.async_entries.return_value = []
        self.hass.config_entries.async_entry_for_domain_unique_id.return_value = None
        self.hass.config_entries.flow.async_progress_by_handler.return_value = []
        self.hass.states.get.return_value = SimpleNamespace(
            attributes={"friendly_name": "Living Room"}
        )
        self.registry = Mock()
        self.registry.entities = {
            "media_player.tv": SimpleNamespace(
                entity_id="media_player.tv", platform="androidtv", domain="media_player"
            ),
            "remote.tv": SimpleNamespace(
                entity_id="remote.tv", platform="androidtv", domain="remote"
            ),
            "media_player.other": SimpleNamespace(
                entity_id="media_player.other", platform="cast", domain="media_player"
            ),
        }
        self.registry_patch = patch(
            "homeassistant.helpers.entity_registry.async_get",
            return_value=self.registry,
        )
        self.registry_patch.start()
        self.addCleanup(self.registry_patch.stop)
        self.flow = FiremoteConfigFlow()
        self.flow.hass = self.hass
        self.flow.handler = DOMAIN
        self.flow.context = {"source": "user"}
        self.flow.flow_id = "setup-test"

    async def test_form_filters_to_adb_media_players_and_defaults_system_off(self):
        result = await self.flow.async_step_user()
        self.assertEqual(result["type"], "form")
        schema = result["data_schema"]
        validated = schema({"entity_id": "media_player.tv"})
        self.assertFalse(validated["include_system_apps"])
        selector = next(
            value for key, value in schema.schema.items() if key.schema == "entity_id"
        )
        self.assertEqual(selector.config["include_entities"], ["media_player.tv"])

    async def test_create_entry_and_prevent_duplicates(self):
        result = await self.flow.async_step_user({"entity_id": "media_player.tv"})
        self.assertEqual(result["type"], "create_entry")
        self.assertEqual(result["title"], "Living Room")
        self.assertFalse(result["data"]["include_system_apps"])
        self.hass.config_entries.async_entry_for_domain_unique_id.return_value = (
            SimpleNamespace(
                unique_id="media_player.tv", data={}, entry_id="existing", source="user"
            )
        )
        with self.assertRaises(AbortFlow) as aborted:
            await self.flow.async_step_user({"entity_id": "media_player.tv"})
        self.assertEqual(aborted.exception.reason, "already_configured")

    async def test_invalid_entity_stays_on_form(self):
        result = await self.flow.async_step_user({"entity_id": "media_player.other"})
        self.assertEqual(result["errors"], {"entity_id": "invalid_entity"})

    async def test_missing_adb_integration_has_actionable_abort(self):
        self.registry.entities = {}
        result = await self.flow.async_step_user()
        self.assertEqual(result["reason"], "no_adb_entities")

    async def test_yaml_import_creates_one_entry_with_filter_setting(self):
        self.flow.context = {"source": "import"}
        result = await self.flow.async_step_import(
            {"entity_id": "media_player.tv", "include_system_apps": True}
        )
        self.assertTrue(result["data"]["include_system_apps"])

    async def test_options_can_change_system_filter(self):
        flow = FiremoteOptionsFlow()
        flow.hass = self.hass
        flow.handler = "existing"
        flow.flow_id = "options-test"
        self.hass.config_entries.async_get_known_entry.return_value = SimpleNamespace(
            data={"include_system_apps": False}, options={"include_system_apps": True}
        )
        form = await flow.async_step_init()
        self.assertTrue(form["data_schema"]({})["include_system_apps"])
        result = await flow.async_step_init({"include_system_apps": False})
        self.assertEqual(result["data"], {"include_system_apps": False})

    async def test_entry_setup_reload_and_unload(self):
        entry = Mock(data={"entity_id": "media_player.tv"})
        self.registry.async_get.return_value = SimpleNamespace(config_entry_id="adb")
        self.hass.config_entries.async_get_entry.return_value = SimpleNamespace(
            domain="androidtv", runtime_data=SimpleNamespace(aftv=object())
        )
        self.hass.config_entries.async_forward_entry_setups = AsyncMock()
        self.hass.config_entries.async_unload_platforms = AsyncMock(return_value=True)
        self.hass.config_entries.async_reload = AsyncMock()
        self.assertTrue(await async_setup_entry(self.hass, entry))
        self.hass.config_entries.async_forward_entry_setups.assert_awaited_once_with(
            entry, [Platform.SENSOR]
        )
        entry.add_update_listener.assert_called_once()
        await _async_options_updated(self.hass, entry)
        self.hass.config_entries.async_reload.assert_awaited_once_with(entry.entry_id)
        self.assertTrue(await async_unload_entry(self.hass, entry))
        self.hass.config_entries.async_unload_platforms.assert_awaited_once_with(
            entry, [Platform.SENSOR]
        )

    async def test_setup_retries_if_adb_runtime_not_ready(self):
        entry = Mock(data={"entity_id": "media_player.tv"})
        self.registry.async_get.return_value = None
        with self.assertRaises(ConfigEntryNotReady):
            await async_setup_entry(self.hass, entry)

    async def test_sensor_setup_uses_options_over_imported_data(self):
        entry = SimpleNamespace(
            data={"entity_id": "media_player.tv", "include_system_apps": False},
            options={"include_system_apps": True},
        )
        with patch("custom_components.firemote_apps.sensor.FiremoteApps") as sensor:
            add_entities = Mock()
            await setup_sensor(self.hass, entry, add_entities)
            sensor.assert_called_once_with(self.hass, "media_player.tv", True)
            add_entities.assert_called_once_with([sensor.return_value], True)

    async def test_ui_only_setup_registers_frontend_and_icon_routes(self):
        self.hass.config.path.side_effect = lambda *parts: "/config/" + "/".join(parts)
        self.hass.async_add_executor_job = AsyncMock()
        self.hass.http.async_register_static_paths = AsyncMock()
        self.assertTrue(await async_setup(self.hass, {}))
        routes = self.hass.http.async_register_static_paths.call_args.args[0]
        self.assertEqual(
            {route.url_path for route in routes},
            {"/firemote/frontend", "/firemote/icons"},
        )
