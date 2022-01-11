'use strict';

exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    }

    res.json(data);
    res.end();
}

exports.false = function(values, res){
    var data = {
        'status': 404,
        'values': values
    }

    res.json(data);
    res.end();
}