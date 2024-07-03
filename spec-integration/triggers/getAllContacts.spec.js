const { expect } = require('chai');
const { getContext } = require('../common');

const { process: getAllContacts } = require('../../lib/triggers/getAllContacts');

describe('Process getAllContacts test', () => {
  const cfg = {};
  const msg = { data: {} };
  const ctx = getContext();
  const snapshot = {};

  it('should return all contacts', async () => {
    await getAllContacts.call(ctx, msg, cfg, snapshot);
    expect(ctx.emit.callCount).to.equal(7);
  });
});
