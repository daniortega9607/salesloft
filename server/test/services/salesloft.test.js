const assert = require('assert');
const app = require('../../src/app');
const { salesloft } = require('../../src/salesloft');

describe('salesloft client', () => {
  it('fetch my profile', async () => {
    const client = salesloft(app);

    const { data: response } = await client.get('/v2/me.json');
    const { data } = response;

    assert.ok(data.id);
  });
});
