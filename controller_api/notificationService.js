var pins = require('./pins'),
    request = require('request');

exports.start = function() {
    console.log('Notifaction service started...');

    setInterval(function() {
        request({
            method: 'PUT',
            url: 'http//192.168.0.102/log',
            body: getRequest()
        });
    }, 3000);

    function getRequest() {
        var request = [];
        for (var pinName in pins) {
            request.push({
                pin: pinName,
                mode: pins[pinName].mode,
                value: pins[pinName].value
            })
        }

        return JSON.stringify(request);
    }
};