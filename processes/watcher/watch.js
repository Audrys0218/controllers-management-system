'use strict';

var path = require('path'),
    async = require('async'),
    mongoose = require('mongoose'),
    config = require('../../config/env/development.js'),
    models = require('../../modules/api/server/models/sensors.server.model.js'),
    reader = require(path.resolve('./processes/watcher/readers/reader')),
    Sensor = mongoose.model('Sensor'),
    Worker = require('webworker-threads').Worker,
    fileReader = require(path.resolve('./processes/watcher/readers/fileReader')),
    cp = require('child_process');

module.exports.start = function() {

    console.log('start');

    var worker = cp.fork(__dirname + '/readers/fileReader.js', [], { execArgv: ['--debug=5860'] });

    worker.on('message', function(data) {
        console.log('Watcher got message:', data);
    });

    worker.send({
        type: 'init',
        id: 'id121445',
        location: 'testSensor',
        value: 3
    });

    //Sensor.find().exec(function (err, sensors) {
    //    if (err) {
    //        console.log('error');
    //    } else {
    //        reader.read(sensors[0]);
    //        console.log('EEEEEEEEEEEEe');
    //    }
    //});
};
