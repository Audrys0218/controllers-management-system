var pins = require('./pins');

module.exports = {
    setValue: function(req, res){
        pins.setState(req.params.pin, req.params.value);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('success');
    }
}