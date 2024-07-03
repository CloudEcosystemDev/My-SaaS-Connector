/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'myapp' });

const getContext = () => ({
  emit: sinon.spy(),
  logger: log
});

module.exports = { getContext };
