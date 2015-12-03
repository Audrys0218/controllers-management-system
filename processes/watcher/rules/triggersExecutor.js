'use strict';

var path = require('path');

module.exports.executeOutcomes = function(states) {
    console.log(states);
    var keys = Object.keys(keys);
    for (var i = 0; i < keys.length; i++) {
        console.log('Updated controller. Id: ' + states[keys[i]].controller._id);
    }
};
