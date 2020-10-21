// Initializes the `people/sync` service on path `/people/sync`
const { Sync } = require('./sync.class');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/people/sync', new Sync(options, app));
};
