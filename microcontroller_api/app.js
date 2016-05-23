var express = require('express'),
    app = express(),
    raspi = require('raspi'),
    bodyParser = require("body-parser"),
    microcontrollerController = require('./microcontroller.server.controller');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', microcontrollerController.home);
app.post('/set-central-server-ip', microcontrollerController.setCentralServerIp);
app.put('/:pin/value/:value?', microcontrollerController.setState);

raspi.init(function() {
    console.log('Initializing GPIO');
    require('./notification.server.service').start();
});

app.listen(8000);

console.log('Server running on http://127.0.0.1:8000/');

