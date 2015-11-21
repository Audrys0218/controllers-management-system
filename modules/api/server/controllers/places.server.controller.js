'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var place = new Place(req.body.model);

    place.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(new RestResponse(true, place));
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
            res.json(new RestResponse(true, places));
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
            place.title = req.body.model.title;
            place.save(function(){
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(new RestResponse(true, place));
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
                    res.json(new RestResponse(true, place));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Place is invalid'
            });
        }
    });
};
