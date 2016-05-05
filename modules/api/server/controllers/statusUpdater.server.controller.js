//'use strict';
//var async = require('async');
//
//exports.statusCheck = function(req, res){
//    var clientIp = require('request-ip').getClientIp(req).match(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/);
//    if (clientIp.length === 0) {
//        return res.status(400).json({
//            message: 'Unable to parse ip address from request'
//        });
//    }
//
//    async.waterfall([
//        findMicrocontroller,
//        checkIfMicrocontrollerFound,
//        findSensors,
//        checkIfSensorFound,
//        updateSensorValue,
//        checkRules
//    ], done);
//
//    function findMicrocontroller(callback) {
//        MicroController.find({ip: clientIp}).exec(callback);
//    }
//
//    function checkIfMicrocontrollerFound(microcontrollers, callback) {
//        console.log(microcontrollers.length);
//        if (microcontrollers.length === 0) {
//            return callback(new httpError.NotFound('Devices was not found by ip'));
//        }
//
//        callback(null, microcontrollers[0]);
//    }
//
//    function findSensors(microcontroller, callback) {
//        Sensor.find({'$and': [{microController: microcontroller.id}, {pinNumber: req.body.pin}]}).exec(callback);
//    }
//
//    function checkIfSensorFound(sensors, callback) {
//        if (sensors.length === 0) {
//            return callback(new httpError.NotFound('Sensor was not found by pin number'));
//        }
//
//        callback(null, sensors);
//    }
//
//    function done(err) {
//        if (err) {
//            return res.status(err.status || 400).json({
//                message: err.status ? err.message : errorHandler.getErrorMessage(err)
//            });
//        }
//
//        return res.json();
//    }
//};