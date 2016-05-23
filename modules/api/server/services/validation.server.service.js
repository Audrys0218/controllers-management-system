'use strict';

var httpError = require('http-errors'),
    mongoose = require('mongoose'),
    Actuator = mongoose.model('Actuator'),
    Sensor = mongoose.model('Sensor'),
    async = require('async');

module.exports = {
  checkPinAvailability: function(data, callback) {
      async.parallel([
          function(cb) {
              Actuator.find({microController: data.microController, pinNumber: data.pinNumber}).exec(cb);
          },
          function(cb) {
              Sensor.find({microController: data.microController, pinNumber: data.pinNumber}).exec(cb);
          }
      ], function(err, results) {
          if (err) {
              return callback(err);
          }

          if (!data.id && results[0].length + results[1].length > 0) {
              return callback(new httpError.BadRequest('Microcontroller pin is occupied to another device'));
          }
          callback(null);
      });
  } 
};