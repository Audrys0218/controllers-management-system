'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Rule = mongoose.model('Rule'),
    Sensor = mongoose.model('Sensor'),
    Actuator = mongoose.model('Actuator'),
    async = require('async'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var mapToResponseObject = function (dbObject) {
    var ret = {
        id: dbObject._id,
        title: dbObject.title,
        type: dbObject.type,
        priority: dbObject.priority,
        enabled: dbObject.enabled
    };

    if (dbObject.triggers && dbObject.triggers.length > 0) {
        ret.triggers = [];
        dbObject.triggers.forEach(function (item) {
            ret.triggers.push({
                id: item._id,
                sensor: item.sensor,
                value: item.value,
                compareType: item.compareType
            });
        });
    }

    if (dbObject.outcomes && dbObject.outcomes.length > 0) {
        ret.outcomes = [];
        dbObject.outcomes.forEach(function (item) {
            ret.outcomes.push({
                id: item._id,
                actuator: item.actuator,
                value: item.value
            });
        });
    }

    return ret;
};

exports.create = function (req, res) {
    var rule = new Rule(req.body);
    rule.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.json(mapToResponseObject(rule));
        }
    });
};

exports.list = function (req, res) {
    Rule.find().sort('-created').exec(function (err, rules) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(rules.map(function (item) {
                return mapToResponseObject(item);
            }));
        }
    });
};

exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            res.json(mapToResponseObject(rule));
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            rule.title = req.body.title;
            rule.type = req.body.type;
            rule.priority = req.body.priority;
            rule.triggers = req.body.triggers;
            rule.outcomes = req.body.outcomes;
            rule.enabled = req.body.enabled;
            rule.save(function () {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(mapToResponseObject(rule));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            rule.remove(function (err) {
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
                message: 'Rule is invalid'
            });
        }
    });
};

exports.sensorsOptions = function (req, res) {
    Sensor.find().deepPopulate('microController.place').exec(function (err, sensors) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(sensors.map(function (s) {
            return {
                id: s._id,
                place: s.microController && s.microController.place ? s.microController.place.title : '',
                sensor: s.microController ? s.microController.title + '\\ ' + s.title : '',
                type: s.type
            };
        }));
    });
};

exports.actuatorsOptions = function (req, res) {
    Actuator.find().deepPopulate('microController.place').exec(function (err, actuators) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(actuators.map(function (actuator) {
            return {
                id: actuator._id,
                place: actuator.microController && actuator.microController.place ? actuator.microController.place.title : '',
                actuator: actuator.microController ? actuator.microController.title + '\\ ' + actuator.title : '',
                type: actuator.type
            };
        }));
    });
};


