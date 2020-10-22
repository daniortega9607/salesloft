// Initializes the `people/char-frequency` service on path `/people/char-frequency`
const { CharFrequency } = require('./char-frequency.class');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/people/char-frequency', new CharFrequency(options, app));
};
