'use strict';

module.exports = function(app) {
    // Root routing
    var actuator = require('../controllers/actuator.server.controller.js'),
        places = require('../controllers/places.server.controller'),
        rules = require('../controllers/rules.server.controller'),
        sensors = require('../controllers/sensors.server.controller'),
        microcontrollers = require('../controllers/microcontrollers.server.controller'),
        statesCheckerController = require('../controllers/states-checker.server.controller');

    function isAuthenticated (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.status(400).send({
            message: 'User is not signed in'
        });
    }

    app.route('/api/v1/actuator').post(isAuthenticated, actuator.create);
    app.route('/api/v1/actuator').get(isAuthenticated, actuator.list);
    app.route('/api/v1/actuator/:id')
        .get(isAuthenticated, actuator.read)
        .put(isAuthenticated, actuator.update)
        .delete(isAuthenticated, actuator.delete);
    app.route('/api/v1/actuator/:id/value').put(isAuthenticated, actuator.changeValue);

    app.route('/api/v1/places').post(isAuthenticated, places.create);
    app.route('/api/v1/places').get(isAuthenticated, places.list);
    app.route('/api/v1/places/:id')
        .get(isAuthenticated, places.read)
        .put(isAuthenticated, places.update)
        .delete(isAuthenticated, places.delete);

    app.route('/api/v1/rules').post(isAuthenticated, rules.create);
    app.route('/api/v1/rules').get(isAuthenticated, rules.list);
    app.route('/api/v1/rules/sensors-options').get(isAuthenticated, rules.sensorsOptions);
    app.route('/api/v1/rules/actuators-options').get(isAuthenticated, rules.actuatorsOptions);
    app.route('/api/v1/rules/:id')
        .get(isAuthenticated, rules.read)
        .put(isAuthenticated, rules.update)
        .delete(isAuthenticated, rules.delete);

    app.route('/api/v1/sensors').post(isAuthenticated, sensors.create);
    app.route('/api/v1/sensors').get(isAuthenticated, sensors.list);
    app.route('/api/v1/sensors/values').get(isAuthenticated, sensors.sensorsValues);
    app.route('/api/v1/sensors/:id')
        .get(isAuthenticated, sensors.read)
        .put(isAuthenticated, sensors.update)
        .delete(isAuthenticated, sensors.delete);

    app.route('/api/v1/microcontroller').post(isAuthenticated, microcontrollers.create);
    app.route('/api/v1/microcontroller/ping').post(isAuthenticated, microcontrollers.ping);
    app.route('/api/v1/microcontroller').get(isAuthenticated, microcontrollers.list);
    app.route('/api/v1/microcontroller/:id')
        .get(isAuthenticated, microcontrollers.read)
        .put(isAuthenticated, microcontrollers.update)
        .delete(isAuthenticated, microcontrollers.delete);

    app.route('/api/v1/states-checker/check').post(statesCheckerController.check);
};
