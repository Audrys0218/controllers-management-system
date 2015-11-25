'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    Rule = mongoose.model('Rule'),
    async = require('async'),
    RuleTrigger = mongoose.model('RuleTrigger'),
    RuleOutcome = mongoose.model('RuleOutcome'),
    RestResponse = require(path.resolve('./modules/api/server/common/restResponse')).RestResponse,
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var ret = {};

    var rule = new Rule(req.body);
    rule.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            ret.id = rule._id;
            ret.title = rule.title;
            ret.type = rule.type;

            var parallelObject = {};
            var parallelReady = false;

            if (req.body.triggers && req.body.triggers.length > 0) {
                req.body.triggers.forEach(function(item) {
                   item.rule = ret.id;
                });
                parallelObject.triggers = function(cb) {
                    RuleTrigger.collection.insert(req.body.triggers, cb);
                };
                parallelReady = true;
            }

            if (req.body.outcomes && req.body.outcomes.length > 0) {
                req.body.outcomes.forEach(function(item) {
                    item.rule = ret.id;
                });
                parallelObject.outcomes = function(cb) {
                    RuleOutcome.collection.insert(req.body.outcomes, cb);
                };
                parallelReady = true;
            }

            if (parallelReady) {
                async.parallel(parallelObject, function (err, result) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(result.triggers)
                        });
                    }
                    if (result.triggers) {
                        result.triggers.ops.forEach(function(item){
                            rule._triggers.push(item._id);
                            delete item._id;
                        });
                        ret.triggers = result.triggers.ops;
                    }
                    if (result.outcomes) {
                        result.outcomes.ops.forEach(function(item){
                            rule._outcomes.push(item._id);
                            delete item._id;
                        });
                        ret.outcomes = result.outcomes.ops;
                    }
                    rule.save(function(err) {
                        if (err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        } else {
                            res.json(new RestResponse(true, ret));
                        }
                    });
                });
            }
        }
    });
};

exports.list = function (req, res) {
    Rule.find().sort('-created').populate('_triggers').populate('_outcomes').exec(function (err, rules) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(new RestResponse(true, rules));
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
            rule.save(function () {
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
