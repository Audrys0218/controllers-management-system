'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    MicroController = mongoose.model('MicroController'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    fs = require('fs'),
    app = require(path.resolve('./config/lib/app')),
    async = require('async'),
    httpError = require('http-errors');


exports.create = function (req, res) {
    var microController = new MicroController(req.body);

    microController.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json({
            id: microController._id,
            title: microController.title,
            place: microController.place,
            ip: microController.ip
        });
    });
};

exports.list = function (req, res) {
    MicroController.find().populate('place').exec(function (err, microControllers) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(microControllers.map(function (mc) {
            return {
                id: mc._id,
                title: mc.title,
                placeTitle: mc.place ? mc.place.title : '',
                ip: mc.ip
            };
        }));
    });
};


exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Micrcontroller id is invalid.'
        });
    }

    MicroController.findById(id).exec(function (err, microController) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        if (!microController) {
            return res.status(404).json({
                message: 'Place not found.'
            });
        }

        return res.json({
            id: microController._id,
            title: microController.title,
            place: microController.place,
            ip: microController.ip
        });
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    async.waterfall([
        validateId,
        find,
        checkWasFound,
        update
    ], done);

    function validateId(next) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new httpError.BadRequest('Micro controller id is invalid.'));
        }
        next(null);
    }

    function find(next) {
        MicroController.find({_id: id}).exec(next);
    }

    function checkWasFound(microControllers, next) {
        if (microControllers.length === 0) {
            return next(new httpError.NotFound('Micro controller was not found.'));
        }
        next(null, microControllers[0]);
    }

    function update(microController, next) {
        microController.title = req.body.title;
        microController.place = req.body.place;
        microController.ip = req.body.ip;
        microController.save(next);
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

exports.delete = function (req, res) {
    var id = req.params.id;

    async.waterfall([
        validateId,
        remove,
    ], done);

    function validateId(next) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new httpError.BadRequest('Micr conroller id is invalid.'));
        }
        next(null);
    }

    function remove(next) {
        MicroController.findByIdAndRemove(id, next);
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
