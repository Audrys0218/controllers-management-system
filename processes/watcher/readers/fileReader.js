'use strict';

var fs = require('fs');

module.exports.readFile = function (sensor) {
    console.log('readFile');
    fs.watch('testSensor', function (event, filename) {
        console.log(event);
        console.log(filename);
    });
}; 
