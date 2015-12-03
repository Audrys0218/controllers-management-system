'use strict';

var path = require('path'),
    fileUpdater = require(path.resolve('./processes/watcher/updaters/fileUpdater')),
    httpUpdater = require(path.resolve('./processes/watcher/updaters/httpUpdater'));

module.exports.updateOutcome = function(controller, value, callback) {
    console.log(controller);

    if (controller.communicationType === 'file') {
        fileUpdater.updateFile('devices/controllers/' + controller._id, value, callback);
    } else if  (controller.communicationType === 'http') {
        httpUpdater.updateHttp(controller.communicationPath, value, callback);
    }
    else {
        console.log('Unknown communicationType');
        callback(false);
    }
};
