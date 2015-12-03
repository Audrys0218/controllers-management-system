'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Controller = mongoose.model('Controller'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs');

function createFileIfNotExist(controller) {
    var fullFileName = './devices/controllers/' + controller._id;
    try {
        (fs.accessSync(fullFileName, fs.R_OK | fs.W_OK));
    } catch (e) {
        fs.writeFileSync(fullFileName, '');
    }
}

exports.create = function (req, res) {
    var controller = new Controller(req.body.model);
    controller.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if(controller.communicationType === 'file'){
                createFileIfNotExist(controller);
            }
            res.json(new RestResponse(true, null));
        }
    });
};

exports.list = function (req, res) {
    Controller.find().sort('-created').populate('place').exec(function (err, controllers) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(new RestResponse(true, controllers.map(function(controller){
                return {
                    id: controller._id,
                    title: controller.title,
                    placeTitle: controller.place.title,
                    type: controller.type,
                    communicationPath: controller.communicationPath,
                    isActive: controller.isActive,
                    value: controller.value
                };
            })));
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
            res.json(new RestResponse(true, {
                id: controller._id,
                title: controller.title,
                place: controller.place,
                type: controller.type,
                communicationType: controller.communicationType,
                communicationPath: controller.communicationPath,
                isActive: controller.isActive
            }));
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
                    res.json(new RestResponse(true, null));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Controller is invalid'
            });
        }

        function updateController(controller) {
            controller.title = req.body.model.title;
            controller.place = req.body.model.place;
            controller.type = req.body.model.type;
            controller.communicationType = req.body.model.communicationType;
            controller.communicationPath = req.body.model.communicationPath;
            controller.isActive = req.body.model.isActive;
            if(controller.communicationType === 'file'){
                createFileIfNotExist(controller);
            }
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
                    fs.unlinkSync('./devices/controllers/' + removedController._id);
                    res.json(new RestResponse(true));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Controller is invalid'
            });
        }
    });
};

exports.changeValue = function(req, res){

    //TO DO: send message to worker - worker should make the request for controller and save new value to database

    console.log('New value ' + req.body.value);
    res.json(new RestResponse(true));
};
