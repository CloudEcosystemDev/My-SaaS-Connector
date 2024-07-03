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

  async createContact(data = {}) {
    const options = {
      method: 'POST',
      url: '/contacts',
      data
    };
    this.logger.info('Creation contact with options: %j', options);
    const response = await this.apiRequest(options);
    return response.data;
  }
}

module.exports = MySaasClient;
