var gpio = require('raspi-gpio'),
    pins = {};
module.exports = {
    setState: function(pinName, value) {
        console.log('Setting pin state pinName ' + pinName + ' value ' + value);
        var digitalValue = parseInt(value);

        pins[pinName] = pins[pinName] || {};

        if (isNaN(digitalValue)) {
            if (!pins[pinName].pin) {
                pins[pinName].pin = new gpio.DigitalInput({
                    pin: pinName,
                    pullResistor: gpio.PULL_UP
                });
                pins[pinName].mode = 'input';
            }
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


