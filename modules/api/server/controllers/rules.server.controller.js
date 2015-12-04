'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Rule = mongoose.model('Rule'),
    async = require('async'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    app = require(path.resolve('./config/lib/app'));

var mapToResponseObject = function (dbObject) {
    var ret = {
        id: dbObject._id,
        title: dbObject.title,
        type: dbObject.type,
        priority: dbObject.priority,
        enabled: dbObject.enabled
    };

    if (dbObject.triggers && dbObject.triggers.length > 0) {
        ret.triggers = [];
        dbObject.triggers.forEach(function (item) {
            ret.triggers.push({
                id: item._id,
                sensor: item.sensor,
                value: item.value,
                compareType: item.compareType
            });
        });
    }

    if (dbObject.outcomes && dbObject.outcomes.length > 0) {
        ret.outcomes = [];
        dbObject.outcomes.forEach(function (item) {
            ret.outcomes.push({
                id: item._id,
                controller: item.controller,
                value: item.value
            });
        });
    }

    return ret;
};

exports.create = function (req, res) {
    var rule = new Rule(req.body);
    rule.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            app.getWatcher().send({
                type: 'rule',
                id: rule._id
            });

            return res.json(new RestResponse(true, mapToResponseObject(rule)));
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
            res.json(new RestResponse(true, rules.map(function (item) {
                return mapToResponseObject(item);
            })));
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
            res.json(new RestResponse(true, mapToResponseObject(rule)));
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
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else if (rule) {
            rule.title = req.body.title;
            rule.type = req.body.type;
            rule.priority = req.body.priority;
            rule.triggers = req.body.triggers;
            rule.outcomes = req.body.outcomes;
            rule.enabled = req.body.enabled;
            rule.save(function () {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    app.getWatcher().send({
                        type: 'rule',
                        id: rule._id
                    });
                    res.json(new RestResponse(true, mapToResponseObject(rule)));
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
        if (err) {
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
                    app.getWatcher().send({
                        type: 'rule',
                        id: rule._id
                    });
                    res.json(new RestResponse(true, {}));
                }
            });
        } else {
            return res.status(400).send({
                message: 'Rule is invalid'
            });
        }
    });
};
