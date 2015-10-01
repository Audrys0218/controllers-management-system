'use strict';

module.exports = function (app) {
  // Root routing
  var places = require('../controllers/places.server.controller');

  app.route('/places').post(places.create);

  app.route('/places').get(places.list);

};
