'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var place = new Place(req.body);
    console.log(req.body);
    place.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(place);
        }
    });
};

exports.list = function (req, res) {
    Place.find().sort('-created').exec(function (err, places) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(places);
        }
    });
};


exports.articleByID = function (req, res, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Place is invalid'
        });
    }

    Place.findById(id).exec(function (err, places) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(places);
        }
    });
};



exports.delete = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Place is invalid'
        });
    }

    Place.findById(id).exec(function (err, places) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(places);
        }
    });
};

exports.update = function (req, res) {

    var id = req.body.id;

    Place.findById(id).exec(function (err, place) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            place.title = req.body.title;
            place.save(function(){
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(place);
                }
            });
        }
    });
};

