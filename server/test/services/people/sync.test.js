const assert = require('assert');
const app = require('../../../src/app');

describe('\'people/sync\' service', () => {
  it('registered the service', () => {
    const service = app.service('people/sync');

    assert.ok(service, 'Registered the service');
  });
  it('syncs new records found', async () => {
    const service = app.service('people/sync');

    const { message } = await service.create({});
    assert.match(message, /new records created/);
  });
});
