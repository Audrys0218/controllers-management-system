var pins = require('./pins'),
    request = require('request');

exports.start = function() {
    console.log('Notification service started...');

    setInterval(function() {
        request({
            method: 'PUT',
            url: 'http://192.168.0.102:3000/test',
            body: getRequest()
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('State were send from notification service.');
        });
    }, 3000);

    function getRequest() {
        var request = [],
            pinsData = pins.getStatus();
        for (var pinName in pinsData) {
            if (pinsData[pinName].mode === 'input') {
                pinsData[pinName].value = pinsData[pinName].pin.read();
            }

            request.push({
                pin: pinName,
                mode: pinsData[pinName].mode,
                value: pinsData[pinName].value
            })
        }

        return JSON.stringify(request);
    }
};