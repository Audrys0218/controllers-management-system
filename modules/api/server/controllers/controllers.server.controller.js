'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Controller = mongoose.model('Controller'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

exports.create = function (req, res) {
    var controller = new Controller(req.body.model);
    controller.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json({
            id: controller._id,
            microController: controller.microController,
            title: controller.title,
            type: controller.type,
            pinNumber: controller.pinNumber
        });
    });
};

exports.list = function (req, res) {
    Controller.find().sort('-created').populate('place').exec(function (err, controllers) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(controllers.map(function (controller) {
                return {
                    id: controller._id,
                    title: controller.title,
                    placeTitle: controller.place ? controller.place.title : '',
                    type: controller.type,
                    pinNumber: controller.pinNumber,
                    microController: controller.microController,
                    isActive: controller.isActive,
                    value: controller.value
                };
            }));
        }
    });
};


exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Controller is invalid'
        });
    }

    Controller.findById(id).exec(function (err, controller) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (controller) {
            res.json({
                id: controller._id,
                title: controller.title,
                microController: controller.microController,
                type: controller.type,
                pinNumber: controller.pinNumber,
                isActive: controller.isActive
            });
        } else {
            return res.status(400).send({
                message: 'Controller is invalid'
            });
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Controller is invalid'
        });
    }

    Controller.findById(id).exec(function (err, controller) {
        console.log('update: ' + err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (controller) {
            updateController(controller);
            controller.save(function () {
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
                message: 'Controller is invalid'
            });
        }

        function updateController(controller) {
            controller.title = req.body.model.title;
            controller.microController = req.body.model.microController;
            controller.type = req.body.model.type;
            controller.pinNumber = req.body.model.pinNumber;
            controller.isActive = req.body.model.isActive;
        }
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Controller is invalid'
        });
    }

    Controller.findById(id).exec(function (err, controller) {
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (controller) {
            controller.remove(function (err, removedController) {
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
                message: 'Controller is invalid'
            });
        }
    });
};

exports.changeValue = function (req, res) {
    console.log('New value ' + req.body.value);
    res.json();
};
