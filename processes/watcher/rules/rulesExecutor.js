'use strict';

var path = require('path');

var checkTrigger = function (trigger) {
    if (trigger.compareType === '=') {
        return trigger.sensor.value === trigger.value;
    }
    else if (trigger.compareType === '>') {
        return trigger.sensor.value > trigger.value;
    }
    else if (trigger.compareType === '>=') {
        return trigger.sensor.value >= trigger.value;
    }
    else if (trigger.compareType === '<') {
        return trigger.sensor.value < trigger.value;
    }
    else if (trigger.compareType === '<=') {
        return trigger.sensor.value <= trigger.value;
    }
    return false;
};

var checkTriggersWithAND = function (triggers) {
    for (var i = 0; i < triggers.length; i++) {
        if (!checkTrigger(triggers[i])) {
            return false;
        }
    }
    return true;
};

var checkTriggersWithOR = function (triggers) {
    for (var i = 0; i < triggers.length; i++) {
        if (checkTrigger(triggers[i])) {
            return true;
        }
    }
    return false;
};

var addVirtualControllerStates = function (outcomes, states) {
    for (var i = 0; i < outcomes.length; i++) {
        if (outcomes[i].value !== outcomes[i].controller.value ||
            states[outcomes[i].controller._id]) { //overrides last rules change
            states[outcomes[i].controller._id] = outcomes[i];
        }
    }
    return states;
};

module.exports.execute = function (rules) {
    console.log(rules);
    var states = {};
    for (var i = 0; i < rules.length; i++) {
        var ruleShouldBeApplied;
        if (rules[i].type === '&&') {
            ruleShouldBeApplied = checkTriggersWithAND(rules[i].triggers);
        }
        else if (rules[i].type === '||') {
            ruleShouldBeApplied = checkTriggersWithOR(rules[i].triggers);
        }
        if (ruleShouldBeApplied) {
            console.log('Rules should be applied');
            states = addVirtualControllerStates(rules[i].outcomes, states);
        }
    }
};
