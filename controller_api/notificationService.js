var pins = require('./pins'),
    request = require('request');

exports.start = function() {
    console.log('Notification service started...');
    sendStatus();

    setInterval(sendStatus, 1000);

    function sendStatus() {
        request.post({
            url: 'http://192.168.0.102:3000/test',
            body: getRequest(),
            headers: {'Content-Type': 'application/json'}
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('State were send from notification service.');
        });
    };

    function getRequest() {
        var request = [],
            pinsData = pins.getStatus();
        for (var pinName in pinsData) {
            console.log(pinName);
            if (pinsData[pinName].mode === 'input') {
                pinsData[pinName].value = pinsData[pinName].pin.read();
            }

            request.push({
                pin: pinName,
                mode: pinsData[pinName].mode,
                value: pinsData[pinName].value
            })
        }

        console.log(JSON.stringify(request));

        return JSON.stringify(request);
    }
};