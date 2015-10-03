'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Rule = mongoose.model('Rule'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var rule = new Rule(req.body);
    console.log(req.body);
    rule.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(rule);
        }
    });
};

exports.list = function (req, res) {
    Rule.find().sort('-created').exec(function (err, rules) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(rules);
        }
    });
};


exports.read = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            res.json(rule);
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        console.log('update: ' + err);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            rule.title = req.body.title;
            rule.save(function(){
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(rule);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Rule is invalid'
        });
    }

    Rule.findById(id).exec(function (err, rule) {
        console.log(rule);
        if (err) {
            console.log('error');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            rule.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(rule);
                }
            });
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};
