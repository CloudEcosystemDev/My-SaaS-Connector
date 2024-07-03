const dayjs = require('dayjs');

function getMetadata(metadata) {
  const metadataKeys = ['oihUid', 'recordUid', 'applicationUid'];
  const newMetadata = {};
  for (let i = 0; i < metadataKeys.length; i++) {
    if (metadata && metadataKeys[i] in metadata && metadata[metadataKeys[i]]) {
      newMetadata[metadataKeys[i]] = metadata[metadataKeys[i]];
    }
  }
  return newMetadata;
}

function getLastUpdatedValue(snapshot, cfg, params) {
  if (snapshot && snapshot.lastUpdated) {
    return snapshot.lastUpdated;
  }
  if (params && params.lastUpdated) {
    return params.lastUpdated;
  }
  if (cfg && cfg.nodeSettings && cfg.nodeSettings.initialSnapshot) {
    const initial = dayjs(cfg.nodeSettings.initialSnapshot);
    if (!initial.isValid) {
      throw new Error('Invalid initialSnapshot format');
    }
    return cfg.nodeSettings.initialSnapshot;
  }
  return new Date(0).toISOString();
}

module.exports = {
  getMetadata,
  getLastUpdatedValue
};
