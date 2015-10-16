'use strict';

module.exports = function (app) {
    // Root routing
    var controllers = require('../controllers/controllers.server.controller'),
        places = require('../controllers/places.server.controller'),
        rules = require('../controllers/rules.server.controller'),
        sensors = require('../controllers/sensors.server.controller');

    app.route('/api/v1/controllers').post(controllers.create);
    app.route('/api/v1/controllers').get(controllers.list);
    app.route('/api/v1/controllers/:id')
        .get(controllers.read)
        .put(controllers.update)
        .delete(controllers.delete);

    app.route('/api/v1/places').post(places.create);
    app.route('/api/v1/places').get(places.list);
    app.route('/api/v1/places/:id')
        .get(places.read)
        .put(places.update)
        .delete(places.delete);

    app.route('/api/v1/rules').post(rules.create);
    app.route('/api/v1/rules').get(rules.list);
    app.route('/api/v1/rules/:id')
        .get(rules.read)
        .put(rules.update)
        .delete(rules.delete);

    app.route('/api/v1/sensors').post(sensors.create);
    app.route('/api/v1/sensors').get(sensors.list);
    app.route('/api/v1/sensors/:id')
        .get(sensors.read)
        .put(sensors.update)
        .delete(sensors.delete);
};
