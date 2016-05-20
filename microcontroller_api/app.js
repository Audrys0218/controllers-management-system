var finalhandler = require('finalhandler'),
    http = require('http'),
    Router = require('router'),
    raspi = require('raspi'),
    microcontrollerController = require('./microcontroller.server.controller'),
    configController = require('./config.server.controller'),
    router = Router();

router.get('/', function(req, res) {
    console.log('alive');
    res.json({
        message: 'rasberry pi alive'
    })
});

router.get('/config', configController.getForm);
router.get('/config/change-host', configController.changeHost);

router.put('/:pin/value/:value?', microcontrollerController.setState);

raspi.init(function() {
    console.log('initializing GPIO');
    require('./notification.server.service').start();
});

var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res));
});

server.listen(8000);

console.log('Server running on http://127.0.0.1:8000/');

