'use strict';

module.exports = function(app) {
    // Root routing
    var actuator = require('../controllers/actuator.server.controller.js'),
        places = require('../controllers/places.server.controller'),
        rules = require('../controllers/rules.server.controller'),
        sensors = require('../controllers/sensors.server.controller'),
        microcontrollers = require('../controllers/microcontrollers.server.controller');

    app.route('/api/v1/actuator').post(actuator.create);
    app.route('/api/v1/actuator').get(actuator.list);
    app.route('/api/v1/actuator/:id')
        .get(actuator.read)
        .put(actuator.update)
        .delete(actuator.delete);
    app.route('/api/v1/actuator/:id/value').put(actuator.changeValue);

    app.route('/test/url').post(places.tests);

    app.route('/api/v1/places').post(places.create);
    app.route('/api/v1/places').get(places.list);
    app.route('/api/v1/places/:id')
        .get(places.read)
        .put(places.update)
        .delete(places.delete);

    app.route('/api/v1/rules').post(rules.create);
    app.route('/api/v1/rules').get(rules.list);
    app.route('/api/v1/rules/sensors-options').get(rules.sensorsOptions);
    app.route('/api/v1/rules/actuators-options').get(rules.actuatorsOptions);
    app.route('/api/v1/rules/:id')
        .get(rules.read)
        .put(rules.update)
        .delete(rules.delete);

    app.route('/api/v1/rules/:id/triggers');
    app.route('/api/v1/rules/:id/triggers/:triggerId');

    app.route('/api/v1/rules/:id/sensors');
    app.route('/api/v1/rules/:id/sensors/:sensorId');

    app.route('/api/v1/sensors').post(sensors.create);
    app.route('/api/v1/sensors/value').put(sensors.valueChanged);
    app.route('/api/v1/sensors').get(sensors.list);
    app.route('/api/v1/sensors/values').get(sensors.sensorsValues);
    app.route('/api/v1/sensors/:id')
        .get(sensors.read)
        .put(sensors.update)
        .delete(sensors.delete);

    app.route('/api/v1/microcontroller').post(microcontrollers.create);
    app.route('/api/v1/microcontroller/ping').post(microcontrollers.ping);
    app.route('/api/v1/microcontroller').get(microcontrollers.list);
    app.route('/api/v1/microcontroller/:id')
        .get(microcontrollers.read)
        .put(microcontrollers.update)
        .delete(microcontrollers.delete);

    app.route('/test').put(actuator.test);
};
