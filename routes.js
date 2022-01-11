'use strict';

module.exports = function(app){
    var json = require('./controller');

    app.route('/').get(json.index);
    app.route('/mahasiswa').get(json.getMahasiswa);
    app.route('/mahasiswa/:id').get(json.findMahasiswa);
    app.route('/mahasiswa').post(json.postMahasiswa);
    app.route('/mahasiswa/:id').put(json.putMahasiswa);
}