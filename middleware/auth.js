var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const e = require('express');

// controller from register
exports.register = function(req, res){
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        created_at: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ?? = ?";
    var table = ["user", "email", post.email];
    query = mysql.format(query, table);

    connection.query(query, function(error, rows, fields){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows, fields){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok('Berhasil menambahkan data user baru', res);
                    }
                })
            }else{
                response.fail('email sudah terdaftar', res);
            }
        }
    })
}

exports.login = function(req, res){
    var post = {
        email: req.body.email,
        password: req.body.password
    }

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                })
                user_id = rows[0].id

                var data = {
                    user_id: user_id, 
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["access_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message: 'Token JWT generated success',
                            token: token,
                            cusrrUser: data.user_id
                        });
                    }
                })
            }else{
                res.json({"error": true, "message": "email atau password salah"});
            }
        }
    })
}

exports.pageSecure = function(req, res){
    response.ok('page secure to roles 2', res);
}