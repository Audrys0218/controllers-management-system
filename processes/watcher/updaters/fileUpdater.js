'use strict';

var fs = require('fs'),
    path = require('path');

module.exports.updateFile = function(location, value) {
    try {
        fs.writeFileSync(location, value);
    } catch (e) {
        console.log(e);
        return false;
    }
    console.log('Written to file: ' + value + ' loc: ' + location);
    return true;
};
