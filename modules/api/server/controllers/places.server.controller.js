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


exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Place is invalid'
        });
    }

    Place.findById(id).exec(function (err, place) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (place) {
            res.json(place);
        } else {
            return res.status(400).send({
                message: 'Place is invalid'
            });
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Place is invalid'
        });
    }

    Place.findById(id).exec(function (err, place) {
        console.log('update: ' + err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (place) {
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
        } else {
            return res.status(400).send({
                message: 'Place is invalid'
            });
        }
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Place is invalid'
        });
    }

    Place.findById(id).exec(function (err, place) {
        console.log(place);
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (place) {
            place.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(place);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Place is invalid'
            });
        }
    });
};
