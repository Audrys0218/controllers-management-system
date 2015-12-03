'use strict';

var path = require('path'),
    async = require('async'),
    mongoose = require('mongoose'),
    config = require('../../config/env/development.js'),
    models = require('../../modules/api/server/models/sensors.server.model.js'),
    Sensor = mongoose.model('Sensor'),
    Worker = require('webworker-threads').Worker,
    fileReader = require(path.resolve('./processes/watcher/readers/fileReader')),
    cp = require('child_process');

var port = 5860;

module.exports.start = function() {

    console.log('start');

    var worker = cp.fork(__dirname + '/readers/reader.js', [], { execArgv: ['--debug=' + port++] });

    worker.on('message', function(data) {
        console.log('Watcher got message:', data);
    });

    worker.send({
        type: 'init',
        id: 'idtest',
        location: 'devices/sensors/idtest',
        value: 3,
        communicationType: 'file'
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
