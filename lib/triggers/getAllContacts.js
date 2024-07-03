const MySaasClient = require('../mySaasClient');
const { getMetadata, getLastUpdatedValue } = require('../helpers/helpers');

async function process(msg, cfg, snapshot = {}) {
  this.logger.info('Get All Contacts trigger started');
  const client = new MySaasClient(this, cfg);
  const skipSnapshot = cfg.nodeSettings?.skipSnapshot;
  const continueOnError = cfg.nodeSettings?.continueOnError;
  let params = { ...cfg.triggerParams };
  if (msg.data) {
    this.logger.warn('Trigger data is not empty, going to use it as params');
    params = { ...cfg.triggerParams, ...msg.data };
  }
  params.lastUpdated = getLastUpdatedValue(snapshot, params);

  let results;
  try {
    results = await client.getAllContacts(params);
  } catch (error) {
    this.logger.error(`Error in trigger Get All Contacts: ${error.message}`);
    if (continueOnError) {
      this.logger.info('Emitting empty message due to continueOnError flag being set to true.');
      this.emit('data', { data: {}, metadata: {} });
    } else {
      throw error;
    }
  }
  this.logger.info('Found %s contacts', results.length);
  if (results.length > 0) {
    if (skipSnapshot) {
      this.logger.info('skipSnapshot is enabled, returning data without emitting it. Trigger Get All Contacts processed successfully.');
      return results;
    }
    for (const result of results) {
      const emittedData = {
        metadata: getMetadata(msg.metadata),
        data: result
      };
      this.emit('data', emittedData);
    }
    snapshot.lastUpdated = results[results.length - 1].updated_at;
    this.logger.info('Emitting snapshot: %j', snapshot);
    this.emit('snapshot', snapshot);
  } else {
    this.logger.info('No new contacts found. Trigger Get All Contacts processed successfully.');
  }
}

module.exports = {
  process
};
