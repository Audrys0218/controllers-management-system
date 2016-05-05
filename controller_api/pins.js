var gpio = require('raspi-gpio'),
    pins = {};
module.exports = {
    setState: function(pinName, value) {
        var digitalValue = parseInt(value);

        pins[pinName] = pins[pinName] || {};

        pins[pinName] = pins[pinName] || new gpio.DigitalOutput(pinName);

        pins[pinName].mode = 'output';

        if(isNaN(digitalValue)){
            pins[pinName].output.write(0);
            return;
        }

        pins[pinName].output.write(digitalValue);
    },

    setMode: function(pinName, mode){
        pins[pinName] = pins[pinName] || {};
        pins[pinName].mode =  mode === 'output' ? 'output' : 'input';
        pins[pinName].output = mode === 'output' ? new gpio.DigitalOutput(pinName) : new gpio.DigitalInput(pinName);
    }
};


