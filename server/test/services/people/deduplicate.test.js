const assert = require('assert');
const app = require('../../../src/app');
const { similarity, JaroWinkler } = require('../../../src/utils/similarity');

describe('\'people/deduplicate\' service', () => {
  it('registered the service', () => {
    const service = app.service('people/deduplicate');

    assert.ok(service, 'Registered the service');
  });
  describe('compare two string using similarity', () => {
    it('matches 100% equal', () => {
      const result = similarity('My phrase with no typo', 'My phrase with no typo');
      assert.ok(result === 1);
    });
    it('matches greater than 90%', () => {
      const result = similarity('My phrase with no typo', 'My phrase with on typo');
      assert.ok(result > 0.9);
    });
    it('matches lesser than 90%', () => {
      const result = similarity('My phrase with no typo', 'My typo with phrase no');
      assert.ok(result < 0.9);
    });
  });
  describe('compare two string using JaroWinkler', () => {
    it('matches 100% equal', () => {
      const result = JaroWinkler('My phrase with no typo', 'My phrase with no typo');
      assert.ok(result === 1);
    });
    it('matches greater than 90%', () => {
      const result = JaroWinkler('My phrase with no typo', 'My phrase with on typo');
      assert.ok(result > 0.9);
    });
    it('matches lesser than 90%', () => {
      const result = JaroWinkler('My phrase with no typo', 'My typo with phrase no');
      assert.ok(result < 0.9);
    });
  });
  it('returns a list of possible duplicates using similarity', async () => {
    const service = app.service('people/deduplicate');
    const result = await service.find();
    if (result.length) {
      assert.ok(result[0].similarities.length);
    } else {
      assert.ok(result);
    }
  });
  it('returns a list of possible duplicates using JaroWinkler', async () => {
    const service = app.service('people/deduplicate');
    const result = await service.find({ query: { 'jaro-winkler': true } });
    if (result.length) {
      assert.ok(result[0].similarities.length);
    } else {
      assert.ok(result);
    }
  });
});
