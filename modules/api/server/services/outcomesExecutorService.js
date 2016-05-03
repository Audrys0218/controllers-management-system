'use strict';

var async = require('async'),
    mongoose = require('mongoose'),
    Actuator = mongoose.model('Actuator'),
    MicroController = mongoose.model('MicroController'),
    async = require('async');

function getParallelFunction(outcome) {
    return function(callback) {
        require('request').put({
            url: 'http://' + outcome.actuator.microController.ip + ':8000/' + outcome.actuator.pinNumber + '/value/' + outcome.value
        }, function(err) {
            if (err) {
                console.log('Error occur while trying update actuator ' + err);
                return callback(err);
            }

            Actuator.findOneAndUpdate({_id: outcome.actuator._id}, {value: outcome.value}, function(err) {
                if (err) {
                    console.log('Controller state saving to db failed! ' + err);
                    return callback(err);
                }

                console.log('Controller state saving completed!');
                return callback(null);
            });
        });
    };
}

module.exports.executeOutcomes = function(outcomeStates, callback) {
    var controllerIds = Object.keys(outcomeStates);

    var parallelObj = {};

    console.log('outcomes states');
    console.log(outcomeStates);

    for (var i = 0; i < controllerIds.length; i++) {
        var outcome = outcomeStates[controllerIds[i]];

        parallelObj[controllerIds[i]] = getParallelFunction(outcome);
    }

    if (Object.keys(parallelObj).length > 0) {
        async.parallel(parallelObj, function(err, results) {
            if (err) {
                return callback(err);
            }

            return callback(null, results);
        });
    }

    callback(null);
};
