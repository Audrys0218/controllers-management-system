'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var sensor = new Sensor(req.body);
    console.log(req.body);
    sensor.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(sensor);
        }
    });
};

exports.list = function (req, res) {
    Sensor.find().sort('-created').exec(function (err, sensors) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(new RestResponse(true, sensors));
        }
    });
};


exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Sensor is invalid'
        });
    }

    Sensor.findById(id).exec(function (err, sensor) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (sensor) {
            res.json(sensor);
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Sensor is invalid'
        });
    }

    Sensor.findById(id).exec(function (err, sensor) {
        console.log('update: ' + err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (sensor) {
            sensor.title = req.body.title;
            sensor.save(function(){
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(sensor);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Sensor is invalid'
        });
    }

    Sensor.findById(id).exec(function (err, sensor) {
        console.log(sensor);
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (sensor) {
            sensor.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(sensor);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });
};
