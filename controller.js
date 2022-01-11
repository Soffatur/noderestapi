'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok('REST API send data', res);
};

// get all data
exports.getMahasiswa = function(req, res){
    connection.query("SELECT * FROM mahasiswa", function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    })
}

// get data where id
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

// post data
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

// put data
exports.putMahasiswa = function(req, res){
    let id = req.params.id;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?", [nim, nama, jurusan, id], 
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                if(rows.affectedRows == 0){
                    response.false('data tidak ditemukan untuk di edit', res);
                }else{
                    response.ok('Berhasil mengedit data', res);
                }
            }
        }
    );
}