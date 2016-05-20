var pinsStates = require('./pins-states'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config.json');

module.exports = {
    home: function(req, res ){
        res.sendFile(path.join(__dirname+'/public/host-config-form.html'));
    },

    setState: function(req, res){
        pinsStates.setState(req.params.pin, req.params.value);
        res.send();
    },

    setCentralServerIp: function(req, res){
        config.server = req.body.ip;
        fs.writeFileSync('./config.json', JSON.stringify(config));
        res.sendFile(path.join(__dirname+'/public/host-config-form.html'));
    }
}