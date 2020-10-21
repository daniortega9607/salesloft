const { NotImplemented } = require('@feathersjs/errors');

/* eslint-disable no-unused-vars */
exports.Deduplicate = class Deduplicate {
  constructor (options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find (params) {
    return [];
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
