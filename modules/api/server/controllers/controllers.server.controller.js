'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Controller = mongoose.model('Controller'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var controller = new Controller(req.body);
    console.log(req.body);
    controller.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(controller);
        }
    });
};

exports.list = function (req, res) {
    Controller.find().sort('-created').exec(function (err, controllers) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(controllers);
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
            res.json(controller);
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
            controller.title = req.body.title;
            controller.save(function(){
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(controller);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Controller is invalid'
            });
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
        console.log(controller);
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (controller) {
            controller.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(controller);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Controller is invalid'
            });
        }
    });
};
