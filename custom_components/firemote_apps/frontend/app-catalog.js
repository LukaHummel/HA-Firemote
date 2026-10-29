// Home Assistant replaces state objects, arrays, and registries when they change.
// Weak indexes share lookups across cards without retaining old state snapshots.
const catalogIndexes = new WeakMap();
const appIndexes = new WeakMap();
const filteredApps = new WeakMap();
const sourceApps = new WeakMap();
const emptyApps = Object.freeze([]);

function indexCatalogs(states) {
  let index = catalogIndexes.get(states);
  if (index) return index;
  const catalogs = [];
  const byEntity = new Map();
  for (const state of Object.values(states)) {
    const attributes = state?.attributes;
    if (typeof attributes?.firemote_entity !== 'string' || !Array.isArray(attributes.apps)) continue;
    catalogs.push(state);
    if (!byEntity.has(attributes.firemote_entity)) byEntity.set(attributes.firemote_entity, state);
  }
  index = { catalogs, byEntity, registries: new WeakMap() };
  catalogIndexes.set(states, index);
  return index;
}

export function appCatalogState(hass, config) {
  if (!hass?.states) return;
  const index = indexCatalogs(hass.states);
  const exact = index.byEntity.get(config?.entity);
  if (exact) return exact;
  const entities = hass.entities;
  const deviceId = entities?.[config?.entity]?.device_id;
  if (!deviceId) return;
  let byDevice = index.registries.get(entities);
  if (!byDevice) {
    byDevice = new Map();
    for (const catalog of index.catalogs) {
      const id = entities[catalog.attributes.firemote_entity]?.device_id;
      if (id) byDevice.set(id, byDevice.has(id) ? undefined : catalog);
    }
    index.registries.set(entities, byDevice);
  }
  return byDevice.get(deviceId);
}

export function deviceApps(hass, config) {
  const catalog = appCatalogState(hass, config);
  if (catalog) {
    if (catalog.state === 'unavailable' || catalog.state === 'unknown') return emptyApps;
    const apps = catalog.attributes.apps;
    let filtered = filteredApps.get(apps);
    if (!filtered) {
      filtered = apps.filter(app => typeof app?.id === 'string' && app.id && typeof app.name === 'string');
      filteredApps.set(apps, filtered);
    }
    return filtered;
  }
  if (config?.device_family !== 'apple-tv' && config?.device_family !== 'roku') return null;
  const sources = hass?.states?.[config?.entity]?.attributes.source_list;
  if (!Array.isArray(sources)) return null;
  let apps = sourceApps.get(sources);
  if (!apps) {
    apps = [...new Set(sources.filter(source => typeof source === 'string' && source.trim()))]
      .map(source => ({ id: source, name: source }));
    sourceApps.set(sources, apps);
  }
  return apps;
}

// Old selections can store display names; a matching package ID takes priority.
export function resolveDeviceApp(apps, source) {
  if (!apps) return;
  let index = appIndexes.get(apps);
  if (!index) {
    const byId = new Map();
    const byName = new Map();
    for (const app of apps) {
      if (!byId.has(app.id)) byId.set(app.id, app);
      if (!byName.has(app.name)) byName.set(app.name, app);
    }
    index = { byId, byName };
    appIndexes.set(apps, index);
  }
  return index.byId.get(source) || index.byName.get(source);
}

export function decodeSource(value) {
  const source = value.slice(7);
  try {
    return decodeURIComponent(source);
  } catch {
    // Malformed escapes in hand-written YAML must not break the whole card.
    return source;
  }
}
