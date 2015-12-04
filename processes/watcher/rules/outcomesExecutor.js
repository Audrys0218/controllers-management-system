'use strict';

var path = require('path'),
    async = require('async'),
    updater = require(path.resolve('./processes/watcher/updaters/updater')),
    mongoose = require('mongoose'),
    controllersModel = require('../../../modules/api/server/models/controllers.server.model.js'),
    Controller = mongoose.model('Controller');

var getParallelFunction = function (outcome) {
    return function (callback) {
        var result;
        var cb = function(success) {
            console.log('Updated: ' + result);
            if (success) {
                Controller.findOneAndUpdate({_id: outcome.controller._id}, {value: outcome.value}, function (err) {
                    if (err) {
                        console.log('Controller state saving to db failed! ' + err);
                        callback(null, 'error saving');
                    } else {
                        console.log('Controller state saving completed!');
                        callback(null, 'success');
                    }
                });
            } else {
                callback(null, 'error writing');
            }
        };
        result = updater.updateOutcome(outcome.controller, outcome.value, cb);
    };
};

module.exports.executeOutcomes = function (outcomeStates, callback) {
    //console.log('States: ' + outcomeStates);

    var controllerIds = Object.keys(outcomeStates);

    var parallelObj = {};

    for (var i = 0; i < controllerIds.length; i++) {
        var outcome = outcomeStates[controllerIds[i]];

        parallelObj[controllerIds[i]] = getParallelFunction(outcome);
    }

    if (Object.keys(parallelObj).length > 0) {
        async.parallel(parallelObj, function(err, results) {
            console.log(results);
            if (callback) {
                callback(results);
            }
        });
    }
};
