const people = require('./people/people.service.js');
const peopleSync = require('./people/sync/sync.service.js');
const peopleDeduplicate = require('./people/deduplicate/deduplicate.service.js');
const peopleCharFrequency = require('./people/char-frequency/char-frequency.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(peopleSync);
  app.configure(peopleDeduplicate);
  app.configure(peopleCharFrequency);
  app.configure(people);
};
