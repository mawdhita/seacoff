const mysql = require('mysql2');

// Gunakan URL koneksi dari Railway
const connection = mysql.createConnection('mysql://root:MVLuTixdZImaYvpJVKpGqOFZFZxedKxQ@switchback.proxy.rlwy.net:23941/railway');

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to MySQL database railway');
    }
});

module.exports = connection;
