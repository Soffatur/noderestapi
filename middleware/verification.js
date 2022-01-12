const { response } = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification(roles){
    return function(req, rest, next){
        // check authorization header
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            // verify
            jwt.verify(token, config.secret, function(error, decoded){
                if(error){
                    return rest.status(401).send({auth: false, message: "token tidak terdaftar"});
                }else{
                    // return response.ok(roles);
                    if(roles == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth: false, message: "authorization failed"});
                    }
                }
            })
        }else{
            return rest.status(401).send({auth: false, message: "unauthorization"});
        }
    }
}

module.exports = verification;