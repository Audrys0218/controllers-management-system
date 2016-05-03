'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Actuator = mongoose.model('Actuator'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

exports.create = function(req, res) {
    var actuator = new Actuator(req.body);
    actuator.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json({
            id: actuator._id,
            microController: actuator.microController,
            title: actuator.title,
            type: actuator.type,
            pinNumber: actuator.pinNumber
        });
    });
};

exports.list = function(req, res) {
    Actuator.find().sort('-created').deepPopulate('microController.place').exec(function(err, actuators) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(actuators.map(function(actuator) {
                return {
                    id: actuator._id,
                    title: actuator.title,
                    placeTitle: actuator.place ? actuator.place.title : '',
                    type: actuator.type,
                    pinNumber: actuator.pinNumber,
                    isActive: actuator.isActive,
                    value: actuator.value,
                    microController: actuator.microController ? actuator.microController.title : '',
                    place: actuator.microController && actuator.microController.place ? actuator.microController.place.title : ''
                };
            }));
        }
    });
};


exports.read = function(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Actuator id is invalid'
        });
    }

    Actuator.findById(id).exec(function(err, actuator) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (actuator) {
            res.json({
                id: actuator._id,
                title: actuator.title,
                microController: actuator.microController,
                type: actuator.type,
                pinNumber: actuator.pinNumber,
                isActive: actuator.isActive
            });
        } else {
            return res.status(400).send({
                message: 'Actuator id is invalid'
            });
        }
    });
};

exports.update = function(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Actuator id is invalid'
        });
    }

    Actuator.findById(id).exec(function(err, actuator) {
        console.log('update: ' + err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (actuator) {
            updateActuator(actuator);
            actuator.save(function() {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json();
                }
            });
        } else {
            return res.status(400).send({
                message: 'Actuator id is invalid'
            });
        }

        function updateActuator(actuator) {
            console.log('pin number');
            console.log(req.body.pinNumber);
            actuator.title = req.body.title;
            actuator.microController = req.body.microController;
            actuator.type = req.body.type;
            actuator.pinNumber = req.body.pinNumber;
            actuator.isActive = req.body.isActive;
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Actuator id is invalid'
        });
    }

    Actuator.findById(id).exec(function(err, actuator) {
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (actuator) {
            actuator.remove(function(err, removedController) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json();
                }
            });
        } else {
            return res.status(400).send({
                message: 'Actuator id is invalid'
            });
        }
    });
};

exports.changeValue = function(req, res) {
    var id = req.params.id;
    var outcomExecutor = require('../services/outcomesExecutorService');
    Actuator.findOne({_id: id}).populate('microController').exec(function(err, actuator) {
        var outcomes = {};

        outcomes[actuator._id] = {
            actuator: actuator,
            value: req.body.value
        };

        outcomExecutor.executeOutcomes(outcomes, function(){
            return res.json();
        });
    });
};
