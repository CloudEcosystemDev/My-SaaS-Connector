const { expect } = require('chai');
const { getContext } = require('../common');

const { process: createContact } = require('../../lib/actions/createContact');

describe('Process createContact test', () => {
  const cfg = {};
  const msg = { data: { name: 'Hello' } };
  const ctx = getContext();

  it('should return all contacts', async () => {
    await createContact.call(ctx, msg, cfg);
    expect(ctx.emit.callCount).to.equal(1);
  });
});
