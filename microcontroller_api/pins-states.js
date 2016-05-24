var gpio = require('raspi-gpio'),
    states = {};
module.exports = {
    setState: function(pinName, value) {

        var digitalValue = parseInt(value);

        states[pinName] = states[pinName] || {};

        if (isNaN(digitalValue)) {
            states[pinName].pin = new gpio.DigitalInput({
                pin: pinName,
                pullResistor: gpio.PULL_UP
            });
            states[pinName].mode = 'input';
            console.log(pinName + ' was opened as input');
        } else {
            states[pinName].pin = new gpio.DigitalOutput(pinName);
            states[pinName].mode = 'output';
            console.log(pinName + ' was opened as output');

            states[pinName].pin.write(digitalValue);
            states[pinName].value = digitalValue;
        }
    },
    getStates: function(){
        return states;
    }
};


