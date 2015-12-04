'use strict';

var path = require('path'),
    async = require('async'),
    mongoose = require('mongoose'),
    config = require('../../config/env/development.js'),
    sensorsModel = require('../../modules/api/server/models/sensors.server.model.js'),
    placesModel = require('../../modules/api/server/models/places.server.model.js'),
    rulesModel = require('../../modules/api/server/models/rules.server.model.js'),
    controllersModel = require('../../modules/api/server/models/controllers.server.model.js'),
    rulesHandler = require(path.resolve('./processes/watcher/rules/rulesHandler')),
    Sensor = mongoose.model('Sensor'),
    Rule = mongoose.model('Rule'),
    Controller = mongoose.model('Controller'),
    cp = require('child_process');

var port = 5860,
    sensorWorkers = [];

var startSensorWorker = function (sensor) {
    var worker = cp.fork(__dirname + '/readers/reader.js', [], {execArgv: ['--debug=' + port++]});

    worker.on('message', function (data) {
        handleSensorResponse(data);
    });

    worker.send({
        type: 'init',
        id: sensor.id,
        location: 'devices/sensors/' + sensor.id,
        interval: 1000,
        value: sensor.value,
        communicationType: sensor.communicationType
    });

    sensorWorkers.push({
        id: sensor.id,
        worker: worker
    });

    console.log('Sensor watcher added: ' + sensor.id);
};

var startSensorWorkerById = function(id) {
    Sensor.findById(id).exec(function (err, sensor) {
        if (err) {
            console.log('startSensorWorkerById: sensor error');
        } else {
            startSensorWorker(sensor);
        }
    });
};

var killSensorWorker = function (id) {
    var sensorWorkerId;
    for (var i = 0; i < sensorWorkers.length; i++) {
        if (sensorWorkers[i].id === id) {
            sensorWorkerId = i;
            break;
        }
    }
    if (typeof sensorWorkerId === 'number') {
        sensorWorkers[sensorWorkerId].worker.kill();
        sensorWorkers.splice(sensorWorkerId, 1);
        console.log('Removed sensor watcher. Id: ' + id);
    } else {
        console.log('Couldnt remove sensors worker as its id was not found. Id: ' + id);
    }
};

var handleSensorResponse = function (response) {
    console.log('Watcher got message:', response);
    if (response.type === 'error') {
        handleSensorErrorResponse(response);
    }
    else if (response.type === 'sensorValueChanged') {
        handleSensorValueChangedResponse(response);
    }
    else {
        console.log('Unknown type: ' + response.type + '; Id: ' + response.id);
    }
};

var handleSensorValueChangedResponse = function (response) {
    Sensor.findById(response.id).exec(function (err, sensor) {
        if (err) {
            console.log('watcher handleSensor error: ' + JSON.stringify(err));
        } else if (sensor) {
            sensor.value = response.data;
            sensor.save(function () {
                if (err) {
                    console.log('watcher handleSensor save error: ' + JSON.stringify(err));
                } else {
                    findAndExecuteRules({
                        triggers: {
                            $elemMatch: {
                                sensor: response.id
                            }
                        }
                    });
                }
            });
        } else {
            killSensorWorker(response.id);
        }
    });
};

var handleSensorErrorResponse = function (response) {
    killSensorWorker(response.id);
};

var findAndExecuteRules = function (findQuery) {
    Rule.find(findQuery).sort('priority')
        .populate('triggers.sensor').populate('outcomes.controller')
        .exec(function (err, rules) {
            if (err) {
                console.log(err);
            } else {
                if (rules.length > 0) {
                    rulesHandler.execute(rules);
                }
            }
        });
};

module.exports.start = function () {
    Sensor.find().exec(function (err, _sensors) {
        if (err) {
            console.log('sensor error');
        } else {
            _sensors.forEach(function (item) {
                startSensorWorker(item);
            });
        }
    });
};

module.exports.handleSensorEntityChange = function (id, type) {
    console.log('handleSensorEntityChange');
    if (type === 'created') {
        startSensorWorkerById(id);
    } else if (type === 'updated') {
        killSensorWorker(id);
        startSensorWorkerById(id);
    } else if (type === 'deleted') {
        killSensorWorker(id);
    } else {
        console.log('Unknown sensor entity change type: ' + type);
    }
};

module.exports.handleRuleChange = function (id) {
    Rule.findById(id).populate('triggers.sensor').populate('outcomes.controller').exec(function (err, rule) {
        if (err) {
            console.log('handleRuleChange: rule error');
        } else if (rule) {
            rulesHandler.execute([rule]);
        } else {
            console.log('handleRuleChange: rule not found. Id: ' + id);
        }
    });
};

module.exports.handleControllerChange = function (id, type) {
    if (type === 'created') {
        //Do nothing, no rules have this controller yet
    } else if (type === 'deleted') {
        //Do nothing
    } else if (type === 'updated') {
        //Maybe type or something changed
        Controller.findById(id).exec(function (err, controller) {
            if (err) {
                console.log('watcher handleControllerChange error: ' + JSON.stringify(err));
            } else if (controller) {
                findAndExecuteRules({
                    outcomes: {
                        $elemMatch: {
                            controller: id
                        }
                    }
                });
            }
        });
    }
};
