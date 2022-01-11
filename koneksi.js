var mysql = require('mysql');

// create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noderestapi'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('mysql connect');
});

module.exports = conn;