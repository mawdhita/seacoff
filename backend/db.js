const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.MYSQL_PUBLIC_URL,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD, // lo bilang tadi ga pakai password
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect(err => {
    if (err) {
        console.error('Error connect ke database:', err);
    } else {
        console.log('Connected ke MySQL database balen_coffee');
    }
});

module.exports = db;
