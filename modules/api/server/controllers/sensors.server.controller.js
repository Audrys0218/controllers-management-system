'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var sensor = new Sensor(req.body.model);
    sensor.save(function (err) {
        if (err) {
            return res.status(400).send(new RestResponse(false, null, [errorHandler.getErrorMessage(err)]));
        } else {
            res.json(new RestResponse(true));
        }
    });
};

exports.list = function (req, res) {
    Sensor.find().sort('-created').populate('place').exec(function (err, sensors) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(new RestResponse(true, sensors.map(function(sensor){
                return {
                    id: sensor._id,
                    title: sensor.title,
                    placeTitle: sensor.place.title,
                    type: sensor.type,
                    communicationType: sensor.communicationType,
                    communicationPath: sensor.communicationPath,
                    isActive: sensor.isActive
                };
            })));
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
            res.json(new RestResponse(true, {
                id: sensor._id,
                title: sensor.title,
                place: sensor.place,
                type: sensor.type,
                communicationType: sensor.communicationType,
                communicationPath: sensor.communicationPath,
                isActive: sensor.isActive
            }));
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
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (sensor) {
            updateSensor(sensor);
            sensor.save(function () {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(new RestResponse(true));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });

    function updateSensor(sensor){
        sensor.title = req.body.model.title;
        sensor.place = req.body.model.place;
        sensor.type = req.body.model.type;
        sensor.communicationPath = req.body.model.communicationPath;
        sensor.isActive = req.body.model.isActive;
    }
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
                    res.json(new RestResponse(true));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });
};
