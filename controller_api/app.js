var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
var raspi = require('raspi');
var gpio = require('raspi-gpio');

var router = Router();
var apiStatus = Router();

var status = 0;
var output;

router.use('/api/v1/status', apiStatus);

router.get('/', function(req, res) {
    console.log('alive');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
        message: 'alive'
    }));
});

apiStatus.get('/', function(req, res) {
    console.log('status');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
        message: 'success',
        data: status
    }));
});

apiStatus.put('/:value', function(req, res) {
    var value = req.params.value;
    console.log('put: ' + value);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (value === '0' || value === '1') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            message: 'success'
        }));
        if (value === '1') {
            output.write(0);
            status = 1;
        } else {
            output.write(1);
            status = 0;
        }
    } else {
        res.statusCode = 400;
        res.end(JSON.stringify({
            message: 'Supported values range is [0..1]'
        }));
    }
});

raspi.init(function() {
    console.log('initializing GPIO');
    output = new gpio.DigitalOutput('GPIO4');
    output.write(1);
    status = 0;
});

var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res))
});

server.listen(8000);

console.log('Server running on http://127.0.0.1:8000/');

