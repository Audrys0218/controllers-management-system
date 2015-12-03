'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();

var io = require('socket.io')(12345);

io.on('connection', function (socket) {

});
