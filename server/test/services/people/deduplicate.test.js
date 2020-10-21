const assert = require('assert');
const app = require('../../../src/app');

describe('\'people/deduplicate\' service', () => {
  it('registered the service', () => {
    const service = app.service('people/deduplicate');

    assert.ok(service, 'Registered the service');
  });
});
