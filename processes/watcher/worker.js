'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/env/development')),
    watch = require(path.resolve('./processes/watcher/watch'));

mongoose.connect(config.db.uri);

process.on('message', function(m) {
    console.log('worker got message:', m);
    if (m.type === 'sensor') {
        watch.handleSensorEntityChange(m.id, m.action);
    } else if (m.type === 'rule') {
        watch.handleRuleChange(m.id);
    } else if (m.type === 'controller') {
        watch.handleControllerChange(m.id, m.action, m.value);
    } else {
        console.log('Unknown message type: ' + m.type);
    }
});

watch.start();
