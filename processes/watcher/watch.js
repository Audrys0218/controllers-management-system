'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    config = require('../../config/env/development.js'),
    models = require('../../modules/api/server/models/sensors.server.model.js'),
    reader = require(path.resolve('./processes/watcher/readers/reader')),
    Sensor = mongoose.model('Sensor');

module.exports.start = function() {

    Sensor.find().exec(function (err, sensors) {
        if (err) {
            console.log('error');
        } else {
            reader.read(sensors[0]);
            console.log('EEEEEEEEEEEEe');
        }
    });
};
