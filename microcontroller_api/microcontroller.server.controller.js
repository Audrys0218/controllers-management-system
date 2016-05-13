var pinsStates = require('./pins-states');

module.exports = {
    setValue: function(req, res){
        pinsStates.setState(req.params.pin, req.params.value);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('success');
    }
}