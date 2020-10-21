const { NotImplemented } = require('@feathersjs/errors');
const get = require('lodash/get');
const { salesloft } = require('../../../salesloft');

/* eslint-disable no-unused-vars */
exports.Sync = class Sync {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    throw new NotImplemented(); 
  }

  async get (id, params) {
    throw new NotImplemented(); 
  }

  async create (data, params) {
    const client = salesloft(this.app);
    const { data: response, error } = await client.get('/v2/people.json');
    if (!error) {
      const records = get(response, 'data');
      const service = this.app.service('people');
      const existingRecords = await service._find({
        query: {
          id: { $in: records.map(record => record.id) }
        },
        paginate: false
      });
      const existingRecordsIds = existingRecords.map(record => record.id);
      const newRecords = await Promise.all(
        records.filter(record => !existingRecordsIds.includes(record.id)).map(newRecord => service.create(newRecord))
      );
      return { message: `${newRecords.length} new records created` };
    } else {
      throw error;
    }
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
