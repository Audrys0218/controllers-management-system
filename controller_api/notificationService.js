var pins = require('./pins'),
    request = require('request');

exports.start = function() {
    console.log('Notification service started...');

    setInterval(function() {
        request({
            method: 'PUT',
            url: 'http://192.168.0.102/log',
            body: getRequest()
        }, function(){
            console.log('State were send from notification service.');
        });
    }, 3000);

    function getRequest() {
        var request = [];
        for (var pinName in pins) {
            if(pins[pinName].mode === 'input'){
                pins[pinName].value = pins[pinName].pin.read();
            }

            request.push({
                pin: pinName,
                mode: pins[pinName].mode,
                value: pins[pinName].value
            })
        }

        return JSON.stringify(request);
    }
};