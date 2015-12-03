'use strict';

var fs = require('fs'),
    path = require('path');

module.exports.updateFile = function(location, value, callback) {
    try {
        fs.writeFileSync(location, value);
    } catch (e) {
        console.log(e);
        callback(false);
    }
    console.log('Written to file: ' + value + ' loc: ' + location);
    callback(true);
};
