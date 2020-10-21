const assert = require('assert');
const app = require('../../../src/app');

describe('\'people/sync\' service', () => {
  it('registered the service', () => {
    const service = app.service('people/sync');

    assert.ok(service, 'Registered the service');
  });
});
