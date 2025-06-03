const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'base9hxylrsai3kv2y24-mysql.services.clever-cloud.com',
    user: 'usjsof7fpcgg6xfd',
    password: 'SwaZZN3A29zENuyAKHvw', // lo bilang tadi ga pakai password
    database: 'base9hxylrsai3kv2y24'
});

db.connect(err => {
    if (err) {
        console.error('Error connect ke database:', err);
    } else {
        console.log('Connected ke MySQL database balen_coffee');
    }
});

module.exports = db;
