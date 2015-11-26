'use strict';

var path = require('path'),
    fileReader = require(path.resolve('./processes/watcher/readers/fileReader'));

module.exports.read = function(sensor) {
    var currentValue = sensor.value;
    if (sensor.type === 'file' || true) {
        fileReader.readFile(sensor);
    } else if (sensor.type === 'http') {

    }
};
