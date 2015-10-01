'use strict';

module.exports = function (app) {
  // Root routing
  var places = require('../controllers/places.server.controller'),
      sensors = require('../controllers/sensors.server.controller');

  app.route('/api/places').post(places.create);
  app.route('/api/places').get(places.list);
  app.route('/api/places/:placeId').get(places.articleByID);
  app.route('/api/places').put(places.update);


  app.route('/api/sensors').get(sensors.list);
  app.route('/api/sensors').post(sensors.create);
  app.route('/api/sensors').delete(sensors.delete);
};
