var pinsStates = require('./pins-states'),
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
            pinsData = pinsStates.getStates();
        for (var pinName in pinsData) {
            console.log(pinName);
            if (pinsData[pinName].mode === 'input') {
                pinsData[pinName].value = pinsData[pinName].pin.read() === 0 ? 1 : 0;
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