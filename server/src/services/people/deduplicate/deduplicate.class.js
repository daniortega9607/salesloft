const { NotImplemented } = require('@feathersjs/errors');
const { similarity, JaroWinkler } = require('../../../utils/similarity');

/* eslint-disable no-unused-vars */
exports.Deduplicate = class Deduplicate {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    let useJaroWinkler;
    if (params && params.query) {
      if (params.query['jaro-winkler'] && typeof params.query['jaro-winkler'] === 'string') {
        useJaroWinkler = params.query['jaro-winkler'] === 'true';
      } else {
        useJaroWinkler = params.query['jaro-winkler'];
      }
    }
    const service = this.app.service('people');
    const records = await service._find({
      query: {
        $select: ['id', 'email_address']
      },
      paginate: false
    });
    const results = [];
    await Promise.all(records.map(async record => {
      if (record.email_address) {
        const similarities = records.reduce((prev, next) => {
          if (record.id !== next.id && next.email_address) {
            let result;
            if (useJaroWinkler) {
              result = JaroWinkler(record.email_address, next.email_address);
            } else {
              result = similarity(record.email_address, next.email_address);
            }
            if (result >= (useJaroWinkler ? 0.90 : 0.85)) {
              prev.push({...next, weigth: result });
            }
          }
          return prev;
        }, []);
        if (similarities.length) {
          results.push({
            ...record,
            similarities
          });
        }
      }
    }));
    return results;
  }

  async get (id, params) {
    return {};
  }

  async create (data, params) {
    throw new NotImplemented();
  }

  async update (id, data, params) {
    throw new NotImplemented(); 
  }

  async patch (id, data, params) {
    throw new NotImplemented(); 
  }

  async remove (id, params) {
    throw new NotImplemented(); 
  }
};
