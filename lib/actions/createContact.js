const MySaasClient = require('../mySaasClient');
const { getMetadata } = require('../helpers/helpers');

async function process(msg, cfg) {
  this.logger.info('Create Contact action started');
  const client = new MySaasClient(this, cfg);
  const continueOnError = cfg.nodeSettings?.continueOnError;
  const { data } = msg;

  let result;
  try {
    result = await client.createContact(data);
  } catch (error) {
    this.logger.error(`Error in action Create Contact: ${error.message}`);
    if (continueOnError) {
      this.logger.info('Emitting empty message due to continueOnError flag being set to true.');
      this.emit('data', { data: {}, metadata: {} });
    } else {
      throw error;
    }
  }
  this.logger.info('Contact created successfully, going to emit...');
  const emittedData = {
    metadata: getMetadata(msg.metadata),
    data: result
  };
  await this.emit('data', emittedData);
  this.logger.info('Create Contact action finished');
}

module.exports = {
  process
};
