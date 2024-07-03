const logger = require('@openintegrationhub/ferryman/lib/logging');

async function processAction(req, res, _, actionParams) {
  const { secretId, data } = actionParams;
  const { ferryman } = req;
  const { operationId, parameters, cfg } = data;
  const { process: triggerProcess } = require(`../triggers/${operationId}`);

  const msg = { data: parameters || {}, metadata: {} };

  const snapshot = {};
  const incomingMessageHeaders = {};
  const tokenData = {};

  // only when the secretId parameter is provided
  if (secretId) {
    const { authorization } = req.headers;
    const splittedAuthorization = authorization.split(' ');
    const token = splittedAuthorization[1];

    try {
      const secret = await ferryman.fetchSecret(secretId, token);
      Object.assign(cfg, secret);
    } catch (error) {
      logger.error('Error getting the secret', error);
    }
  }

  // to not fail the lookup function when they call to the emit function
  globalThis.emit = () => {};
  const context = {
    logger,
    emit() {}
  };
  const dataResponse = await triggerProcess.call(
    context,
    msg,
    cfg,
    snapshot,
    incomingMessageHeaders,
    tokenData
  );

  return res.send(dataResponse);
}

module.exports.process = processAction;
