'use strict';
var fs = require('fs'),
    config = require('./config.json');

exports = {
    getForm : function(){
        fs.readFile(__dirname + 'host-config-form.html', 'utf8', function(err, text){
            res.send(text);
        });
    },
    changeHost: function(req, res){
        config.server = req.body.ip;
        fs.writeFileSync('./config.json', JSON.stringify(config));
        fs.readFile(__dirname + 'host-config-form.html', 'utf8', function(err, text){
            res.send(text);
        });
    }
};