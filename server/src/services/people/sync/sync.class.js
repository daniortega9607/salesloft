const { NotImplemented } = require('@feathersjs/errors');

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
    return data;
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
