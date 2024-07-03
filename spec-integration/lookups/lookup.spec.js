const { expect } = require('chai');
const sinon = require('sinon');
const lookup = require('../../lib/lookups/lookup');
const { getContext } = require('../common');

describe('Lookup test', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should getAllContacts lookup', async () => {
    let capturedDataResponse;
    const res = {
      send: sandbox.stub().callsFake(dataResponse => {
        capturedDataResponse = dataResponse;
      })
    };
    const ctx = getContext();
    const actionParams = {
      data: {
        operationId: 'getAllContacts',
        cfg: {
          triggerParams: {},
          nodeSettings: { skipSnapshot: true }
        }
      }
    };

    await lookup.process.call(ctx, {}, res, {}, actionParams);
    expect(capturedDataResponse.length).to.equal(6);
  });
});
