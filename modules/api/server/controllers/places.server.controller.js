'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    httpError = require('http-errors'),
    async = require('async');

exports.create = function (req, res) {
    var place = new Place(req.body.model);

    place.save(function (err) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json({
            id: place._id,
            title: place.title
        });
    });
};

exports.list = function (req, res) {
    Place.find().sort('-created').exec(function (err, places) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        return res.json(places.map(function (p) {
            return {
                id: p._id,
                title: p.title
            };
        }));
    });
};


exports.read = function (req, res) {

    console.log(new Error('bla'));

    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Place id is invalid'
        });
    }

    Place.findById(id).exec(function (err, place) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }

        if (!place) {
            return res.status(404).json({
                message: 'Place not found'
            });
        }

        return res.json({
            id: place._id,
            title: place.title
        });
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    async.waterfall([
        validateId,
        findPlace,
        checkPlaceWasFound,
        updatePlace
    ], done);

    function validateId(next) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(new httpError.BadRequest('Place id is invalid'));
        }
        next(null);
    }

    function findPlace(next) {
        Place.find(id).exec(next);
    }

    function checkPlaceWasFound(places, next) {
        if (places.length === 0) {
            return next(new httpError.NotFound('Place was not found'));
        }
        next(null, places[0]);
    }

    function updatePlace(place, next) {
        place.title = req.body.model.title;
        place.save(next);
    }

    function done(err, result) {
        if (err) {
            return res.status(err.status || 400).json({
                message: err.status ? err.message : errorHandler.getErrorMessage(err)
            });
        }

        return res.json({
            id: result._id,
            title: result.title
        });
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
            next(new httpError.BadRequest('Place id is invalid'));
        }
        next(null);
    }

    function remove(next) {
        Place.remove(id, next);
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
