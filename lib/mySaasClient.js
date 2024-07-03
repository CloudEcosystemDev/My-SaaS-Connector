const Client = require('./client');

class MySaasClient extends Client {
  constructor(context, cfg) {
    super(context, cfg, 'https://private-698cb4-mysaas.apiary-mock.com');
  }

  async getAllContacts(params = {}) {
    const options = {
      method: 'GET',
      url: '/contacts',
      params
    };
    this.logger.info('Fetching contacts with options: %j', options);
    const response = await this.apiRequest(options);
    return response.data;
  }
}

module.exports = MySaasClient;
