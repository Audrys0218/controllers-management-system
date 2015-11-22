'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Sensor = mongoose.model('Sensor'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

function mapToResponseModel(sensor){
    return {
        id: sensor._id,
        title: sensor.title,
        placeId: sensor.placeId,
        type: sensor.type,
        communicationType: sensor.communicationType,
        communicationPath: sensor.communicationPath,
        isActive: sensor.isActive
    };
}

exports.create = function (req, res) {
    var sensor = new Sensor(req.body.model);
    sensor.save(function (err) {
        if (err) {
            return res.status(400).send(new RestResponse(false, null, [errorHandler.getErrorMessage(err)]));
        } else {
            res.json(new RestResponse(true, mapToResponseModel(sensor)));
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
            res.json(new RestResponse(true, sensors.map(mapToResponseModel)));
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
            res.json(new RestResponse(true, mapToResponseModel(sensor)));
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
                    res.json(new RestResponse(true, mapToResponseModel(sensor)));
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
        sensor.placeId = req.body.model.placeId;
        sensor.type = req.body.model.type;
        sensor.communicationType = req.body.model.communicationType;
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
                    res.json(new RestResponse(true, mapToResponseModel(sensor)));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Sensor is invalid'
            });
        }
    });
};
