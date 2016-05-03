var gpio = require('raspi-gpio'),
    pins = {};
module.exports = {
    setState: function(pinName, value) {
        var pin = pins[pinName] || {},
            digitalValue = parseInt(value);

        console.log('pinName ' + pinName);
        console.log('value ' + value);

        pin.output = pin.output || new gpio.DigitalOutput(pinName);

        console.log(pin);

        console.log('changed controller value');
        if(isNaN(digitalValue)){
            pin.output.write(0);
            return;
        }

        console.log('digitalValue ' + digitalValue);

        pin.output.write(digitalValue);
        pins[pinName] = pin;
    }
};


//'GPIO4'

