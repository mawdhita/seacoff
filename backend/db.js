const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // lo bilang tadi ga pakai password
    database: 'balen_coffee'
});

db.connect(err => {
    if (err) {
        console.error('Error connect ke database:', err);
    } else {
        console.log('Connected ke MySQL database balen_coffee');
    }
});

module.exports = db;
