'use strict';

var path = require('path'),
    fileUpdater = require(path.resolve('./processes/watcher/updaters/fileUpdater'));

module.exports.updateOutcome = function(controller, value) {
    console.log(controller);
    var result = false;
    if (controller.communicationType === 'file') {
        result = fileUpdater.updateFile('devices/controllers/' + controller._id, value);
    } else {
        console.log('Unknown communicationType');
    }
    return result;
};
