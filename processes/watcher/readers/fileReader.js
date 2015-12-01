'use strict';

var fs = require('fs');

var id,
    location,
    value = -999;

var check = function() {
    var newValue = parseInt(fs.readFileSync(location, 'utf-8'));
    if (typeof newValue === 'number' && newValue !== value) {
        value = newValue;
        process.send({
            type: 'sensorValueChanged',
            id: id,
            data: value
        });
    }
};

process.on('message', function(data) {
    if (data.type === 'init') {
        id = data.id;
        location = data.location;
        value = data.value;
        setInterval(check, 1000);
    }
    console.log('fileReader got message:', data);
});
