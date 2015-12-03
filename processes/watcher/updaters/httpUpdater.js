'use strict';

var path = require('path'),
    http = require('http'),
    request = require('request');

module.exports.updateHttp = function (url, value, callback) {

    console.log('HTTTTTTTTTTTTTTTTTTTTP update');
    request({url: url + '/' + value, method: 'PUT'}, function (err, response, body) {
            if (err) {
                console.log(err);
                callback(false);
            }
            else {
                var resp = JSON.parse(body);
                if (resp.message !== 'success') {
                    console.log(resp);
                    callback(false);
                }
                else {
                    console.log('PUT value');
                    callback(true);
                }
            }
        });
};
