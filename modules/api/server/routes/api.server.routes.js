'use strict';

module.exports = function (app) {
    // Root routing
    var controllers = require('../controllers/controllers.server.controller'),
        places = require('../controllers/places.server.controller'),
        rules = require('../controllers/rules.server.controller'),
        sensors = require('../controllers/sensors.server.controller');

    app.route('/api/controllers').post(controllers.create);
    app.route('/api/controllers').get(controllers.list);
    app.route('/api/controllers/:id')
        .get(controllers.read)
        .put(controllers.update)
        .delete(controllers.delete);

    app.route('/api/places').post(places.create);
    app.route('/api/places').get(places.list);
    app.route('/api/places/:id')
        .get(places.read)
        .put(places.update)
        .delete(places.delete);

    app.route('/api/rules').post(rules.create);
    app.route('/api/rules').get(rules.list);
    app.route('/api/rules/:id')
        .get(rules.read)
        .put(rules.update)
        .delete(rules.delete);

    app.route('/api/sensors').post(sensors.create);
    app.route('/api/sensors').get(sensors.list);
    app.route('/api/sensors/:id')
        .get(sensors.read)
        .put(sensors.update)
        .delete(sensors.delete);
};
