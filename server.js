'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();


var cp = require('child_process');

console.log(__dirname + '/processes/watch.js');

var n = cp.fork(__dirname + '/processes/watch.js', [], { execArgv: ['--debug=5859'] });

n.on('message', function(m) {
    console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });
