const axios = require('axios');

class Client {
  constructor(context, cfg, baseURL) {
    this.logger = context.logger;
    this.cfg = cfg;
    this.baseURL = baseURL;
  }

  async apiRequest(options, axiosInstance = axios) {
    const callOptions = {
      ...options,
      baseURL: this.baseURL,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${this.cfg.accessToken}`
      }
    };

    try {
      return await axiosInstance.request(callOptions);
    } catch (err) {
      this.logger.error(`API request failed: ${err.message}`);
      throw err;
    }
  }
}

module.exports = Client;
