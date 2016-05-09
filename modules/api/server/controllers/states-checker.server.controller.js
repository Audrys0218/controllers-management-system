'use strict';

var mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    MicroController = mongoose.model('MicroController'),
    Rule = mongoose.model('Rule'),
    Actuator = mongoose.model('Actuator'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    async = require('async'),
    httpError = require('http-errors'),
    _ = require('lodash'),
    rulesHandler = require('../services/rules-handler.server.service');


exports.check = function(req, res) {
    var clientIp = require('request-ip').getClientIp(req).match(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/);
    if (clientIp.length === 0) {
        return res.status(400).json({
            message: 'Unable to parse ip address from request'
        });
    }

    async.waterfall([
        findMicrocontroller,
        checkIfMicrocontrollerFound,
        checkAndUpdateStatuses,
    ], done);

    function findMicrocontroller(callback) {
        MicroController.find({ip: clientIp}).exec(callback);
    }

    function checkIfMicrocontrollerFound(microcontrollers, callback) {
        if (microcontrollers.length === 0) {
            return callback(new httpError.NotFound('Devices was not found by ip'));
        }

        callback(null, microcontrollers[0]);
    }

    function checkAndUpdateStatuses(microcontroller, callback) {
        Sensor.find({microController: microcontroller._id}, function(err, sensors) {
            sensors.forEach(function(sensor) {
                var currentPinState = _.find(req.body, {'pin': sensor.pinNumber, mode: 'input'});
                if (!currentPinState) {
                    console.log('Sending sensor request ' + sensor.pinNumber + ' value ' + sensor.value);
                    require('request').put({
                        url: 'http://' + microcontroller.ip + ':8000/' + sensor.pinNumber + '/value/'
                    }, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('Send sensor state to microcontroller');
                    });
                }
                console.log('Saving value');
                sensor.value = currentPinState.value;
                sensor.save(function() {
                    Rule.find({
                        $and: [
                            {enabled: true},
                            {
                                triggers: {
                                    $elemMatch: {
                                        sensor: sensor._id
                                    }
                                }
                            }
                        ]
                    }).sort('priority')
                        .populate('triggers.sensor').populate('outcomes.actuator')
                        .exec(function(err, rules) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (rules.length > 0) {
                                    rulesHandler.execute(rules);
                                }
                            }
                        });
                });
            });

            callback(null);
        });

        Actuator.find({microController: microcontroller._id}).populate('microController').exec(function(err, actuators) {
            actuators.forEach(function(actuator) {
                var currentPinState = _.find(req.body, {'pin': actuator.pinNumber, mode: 'output'});
                if (!currentPinState || currentPinState.value !== actuator.value) {
                    var outcomes = {};

                    outcomes[actuator._id] = {
                        actuator: actuator,
                        value: actuator.value
                    };

                    require('../services/outcomes-excutor.server.service').executeOutcomes(outcomes);
                }
            });
        });

        callback(null);
    }

    function done(err) {
        if (err) {
            return res.status(err.status || 400).json({
                message: err.status ? err.message : errorHandler.getErrorMessage(err)
            });
        }

        return res.json();
    }
};

