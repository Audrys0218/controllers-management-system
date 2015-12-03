'use strict';

var path = require('path'),
    fileReader = require(path.resolve('./processes/watcher/readers/fileReader'));

process.on('message', function(data) {
    if (data.type === 'init') {
        if (data.communicationType === 'file') {
            fileReader.start(data);
        }
    }
    console.log('reader got message:', data);
});

module.exports.sendChange = function(id, value) {
    process.send({
        type: 'sensorValueChanged',
        id: id,
        data: value
    });
};

module.exports.sendError = function(id, message) {
    process.send({
        type: 'error',
        id: id,
        data: message
    });
};
