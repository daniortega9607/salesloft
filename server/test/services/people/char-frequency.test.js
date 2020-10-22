const assert = require('assert');
const app = require('../../../src/app');
const { getCharFrequency } = require('../../../src/utils');

const mockedKey = 'test';
const mockedItems = [
  { [mockedKey]: 'My test message' }
];

const expectedResult = [
  { character: 'M', count: 1 },
  { character: 'y', count: 1 },
  { character: 'm', count: 1 },
  { character: 'a', count: 1 },
  { character: 'g', count: 1 },
  { character: ' ', count: 2 },
  { character: 't', count: 2 },
  { character: 'e', count: 3 },
  { character: 's', count: 3 }
];

const expectedDescResult = [
  { character: 'e', count: 3 },
  { character: 's', count: 3 },
  { character: ' ', count: 2 },
  { character: 't', count: 2 },
  { character: 'M', count: 1 },
  { character: 'y', count: 1 },
  { character: 'm', count: 1 },
  { character: 'a', count: 1 },
  { character: 'g', count: 1 }
];

describe('\'people/char-frequency\' service', () => {
  it('registered the service', () => {
    const service = app.service('people/char-frequency');
    assert.ok(service, 'Registered the service');
  });
  it('should return empty because there are no items', async () => {
    const result = getCharFrequency([]);
    assert.deepStrictEqual(result, []);
  });
  it('should return items in asc order', async () => {
    const result = getCharFrequency(mockedItems, mockedKey);
    assert.deepStrictEqual(result, expectedResult);
  });
  it('should return items in desc order', async () => {
    const result = getCharFrequency(mockedItems, mockedKey, 'desc');
    assert.deepStrictEqual(result, expectedDescResult);
  });
  it('should return empty because the field doesn\'t exist', async () => {
    const service = app.service('people/char-frequency');
    const result = await service.find({ query: { field: 'wrong-field' } });
    assert.deepStrictEqual(result, []);
  });
  it('should return items because the field exists', async () => {
    const service = app.service('people/char-frequency');
    const result = await service.find({ query: { field: 'email_address' } });
    assert.ok(result.length);
  });
});
