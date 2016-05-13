'use strict';

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
        if (outcomes[i].value !== outcomes[i].actuator.value || states[outcomes[i].actuator._id]) { //overrides last rule's change
            states[outcomes[i].actuator._id] = outcomes[i];
        }
    }
    return states;
};

module.exports.execute = function (rules) {
    var outcomeStates = {};

    for (var i = 0; i < rules.length; i++) {
        var ruleShouldBeApplied;
        var rule = rules[i];

        if (rule.type === '&&') {
            ruleShouldBeApplied = checkTriggersWithAND(rule.triggers);
        }
        else if (rule.type === '||') {
            ruleShouldBeApplied = checkTriggersWithOR(rule.triggers);
        }

        //console.log(ruleShouldBeApplied);
        if (ruleShouldBeApplied) {
            console.log('Rules should be applied');
            outcomeStates = addVirtualControllerStates(rule.outcomes, outcomeStates);
        }
    }

    require('./outcomes-executor.server.service').executeOutcomes(outcomeStates);
};
