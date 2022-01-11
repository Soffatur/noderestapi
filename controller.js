'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok('REST API send data', res);
};

exports.getMahasiswa = function(req, res){
    connection.query("SELECT * FROM mahasiswa", function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    })
}

exports.findMahasiswa = function(req, res){
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa where id = ?", [id],
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                response.ok(rows[0], res);
            }
        }
    );
}

exports.postMahasiswa = function(req, res){
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    connection.query("INSERT INTO mahasiswa VALUES (0,?,?,?)", [nim, nama, jurusan],
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                response.ok('Berhasil menambahkan data', res);
            }
        }
    );
}