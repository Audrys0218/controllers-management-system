'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    MicroController = mongoose.model('MicroController'),
    Rule = mongoose.model('Rule'),
    Actuator = mongoose.model('Actuator'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs'),
    async = require('async'),
    httpError = require('http-errors'),
    _ = require('lodash');

exports.create = function(req, res) {
    var sensor = new Sensor(req.body);
    sensor.save(function(err, sensor) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.status(201).json({
            id: sensor._id,
            title: sensor.title,
            place: sensor.place,
            pinNumber: sensor.pinNumber,
            type: sensor.type,
            isActive: sensor.isActive,
            microController: sensor.microController
        });
    });
};

exports.list = function(req, res) {
    Sensor.find().sort('-created').deepPopulate('microController.place').exec(function(err, sensors) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(sensors.map(function(sensor) {
            return {
                id: sensor._id,
                title: sensor.title,
                type: sensor.type,
                pinNumber: sensor.pinNumber,
                isActive: sensor.isActive,
                value: sensor.value,
                microController: sensor.microController ? sensor.microController.title : '',
                place: sensor.microController && sensor.microController.place ? sensor.microController.place.title : ''
            };
        }));
    });
};


exports.read = function(req, res) {
    var id = req.params.id;

    Sensor.findById({_id: id}, function(err, sensor) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        if (!sensor) {
            return res.status(404).json({
                message: 'Sensor not found.'
            });
        }

        return res.json({
            id: sensor._id,
            title: sensor.title,
            type: sensor.type,
            pinNumber: sensor.pinNumber,
            isActive: sensor.isActive,
            value: sensor.value,
            microController: sensor.microController
        });
    });
};

exports.update = function(req, res) {
    var id = req.params.id;

    async.waterfall([
        validateId,
        findSensor,
        checkSensorWasFound,
        updateSensor
    ], done);

    function validateId(next) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new httpError.BadRequest('Sensor id is invalid.'));
        }
        next(null);
    }

    function findSensor(next) {
        Sensor.find({_id: id}).exec(next);
    }

    function checkSensorWasFound(sensors, next) {
        if (sensors.length === 0) {
            return next(new httpError.NotFound('Sensor was not found.'));
        }
        next(null, sensors[0]);
    }

    function updateSensor(sensor, next) {
        sensor.title = req.body.title;
        sensor.type = req.body.type;
        sensor.pinNumber = req.body.pinNumber;
        sensor.isActive = req.body.isActive;
        sensor.microController = req.body.microController;

        sensor.save(next);
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

exports.delete = function(req, res) {
    var id = req.params.id;

    async.waterfall([
        validateId,
        removeSensor
    ], done);

    function validateId(next) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new httpError.BadRequest('Sensor id is invalid.'));
        }
        next(null);
    }

    function removeSensor(next) {
        Sensor.findByIdAndRemove(id, function(err) {
            return err ? next(err) : next(null);
        });
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

exports.sensorsValues = function(req, res) {
    Sensor.find().exec(function(err, sensors) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(sensors.map(function(s) {
            return {
                id: s._id,
                value: s.value
            };
        }));
    });
};
