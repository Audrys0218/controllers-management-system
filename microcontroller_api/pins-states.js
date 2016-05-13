var gpio = require('raspi-gpio'),
    states = {};
module.exports = {
    setState: function(pinName, value) {
        console.log('Setting pin state pinName ' + pinName + ' value ' + value);
        var digitalValue = parseInt(value);

        states[pinName] = states[pinName] || {};

        if (isNaN(digitalValue)) {
            if (!states[pinName].pin) {
                states[pinName].pin = new gpio.DigitalInput({
                    pin: pinName,
                    pullResistor: gpio.PULL_UP
                });
                states[pinName].mode = 'input';
            }
        } else {
            if (!states[pinName].pin) {
                states[pinName].pin = new gpio.DigitalOutput(pinName);
                states[pinName].mode = 'output';
            }

            states[pinName].pin.write(digitalValue);
            states[pinName].value = digitalValue;
        }
    },
    getStates: function(){
        return states;
    }
};


