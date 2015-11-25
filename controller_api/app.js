var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
var raspi = require('raspi');
var gpio = require('raspi-gpio');

var router = Router();
var apiStatus = Router();

var status = 0;

router.use('/api/v1/status', apiStatus);

router.get('/', function(req, res) {
    console.log('alive');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('alive');
});

apiStatus.get('/', function(req, res) {
    console.log('status');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(status === 0 ? '0' : '1');
});

apiStatus.put('/on', function(req, res) {
    console.log('on');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('success');
    output.write(0);
    status = 1;
});

apiStatus.put('/off', function(req, res) {
    console.log('off');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('success');
    output.write(1);
    status = 0;
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

