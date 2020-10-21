// Initializes the `people/deduplicate` service on path `/people/deduplicate`
const { Deduplicate } = require('./deduplicate.class');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/people/deduplicate', new Deduplicate(options, app));
};
