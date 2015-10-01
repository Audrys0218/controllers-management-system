'use strict';

exports.list = function(req, res){
    res.send([
        {
            status: "list"
        }
    ]);
};

exports.create = function(req, res){
    res.send([
        {
            status: "created"
        }
    ]);
};

exports.delete = function(req, res){
    res.send([
        {
            status: "deleted"
        }
    ]);
};

