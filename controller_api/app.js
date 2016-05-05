var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
var raspi = require('raspi');
var controller = require('./controller');

var router = Router();

router.get('/', function(req, res) {
    console.log('alive');
    res.json({
        message: 'rasberry pi alive'
    })
});

router.put('/:pin/value/:value', controller.setValue);

raspi.init(function() {
    console.log('initializing GPIO');
    require('./notificationService').start();
});

var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res));
});

server.listen(8000);

console.log('Server running on http://127.0.0.1:8000/');

