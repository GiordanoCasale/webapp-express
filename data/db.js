const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: "",
    database: 'db_movie'
});

connection.connect(() => {
    console.log('Connected to MySQL!')
});

module.exports = connection;