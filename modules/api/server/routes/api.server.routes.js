'use strict';

module.exports = function (app) {
  // Root routing
  var places = require('../controllers/places.server.controller'),
      sensors = require('../controllers/sensors.server.controller');

  app.route('/places').post(places.create);

  app.route('/places').get(places.list);

  app.route('/places').get(places.places);

  app.route('/sensors').get(sensors.list);
  app.route('/sensors').post(sensors.create);
  app.route('/sensors').delete(sensors.delete);
};
