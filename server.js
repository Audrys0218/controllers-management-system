'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();


var cp = require('child_process');

var watcher = cp.fork(__dirname + '/processes/watcher/worker.js', [], { execArgv: ['--debug=5859'] });

watcher.on('message', function(m) {
    console.log('PARENT got message:', m);
});

watcher.send({ hello: 'world' });
