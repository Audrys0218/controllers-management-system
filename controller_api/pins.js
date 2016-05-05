var gpio = require('raspi-gpio'),
    pins = {};
module.exports = {
    setState: function(pinName, value) {
        var digitalValue = parseInt(value);

        pins[pinName] = pins[pinName] || {};

        if (isNaN(digitalValue)) {
            if (!pins[pinName].pin) {
                pins[pinName].pin = new gpio.DigitalInput(pinName);
                pins[pinName].mode = 'input';
            }
            //pins[pinName].value = pins[pinName].pin.read();
        } else {
            if (!pins[pinName].pin) {
                pins[pinName].pin = new gpio.DigitalOutput(pinName);
                pins[pinName].mode = 'output';
            }

            pins[pinName].pin.write(digitalValue);
            pins[pinName].value = digitalValue;
        }
    },
    getStatus: function(){
        return pins;
    }
};


