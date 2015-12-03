'use strict';

var fs = require('fs'),
    path = require('path'),
    reader = require(path.resolve('./processes/watcher/readers/reader'));

var data,
    interval;

var check = function() {
    var newValue;

    try {
        newValue = parseInt(fs.readFileSync(data.location, 'utf-8'));
    } catch (e) {
        reader.sendError(data.id, e);
    }

    if (typeof newValue === 'number' && newValue !== data.value) {
        data.value = newValue;
        reader.sendChange(data.id, data.value);
    }
};

module.exports.start = function(_data) {
    data = _data;
    interval = setInterval(check, data.interval);
};

module.exports.stop = function() {
    clearInterval(interval);
};
