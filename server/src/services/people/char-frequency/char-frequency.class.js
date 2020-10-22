const { NotImplemented } = require('@feathersjs/errors');
const { getCharFrequency } = require('../../../utils');

/* eslint-disable no-unused-vars */
exports.CharFrequency = class CharFrequency {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    const { query = {} } = params;
    const people = await this.app.service('people')._find({
      paginate: false
    });
    const field = query.field || 'email_address';
    return getCharFrequency(people, field, query.order);
  }

  async get (id, params) {
    throw new NotImplemented();
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
