const mysql = require('mysql2');
const url = require('url');

// Railway recommended: use MYSQL_URL environment variable
const dbUrl = process.env.MYSQL_URL || 'mysql://root:MVLuTixdZImaYvpJVKpGqOFZFZxedKxQ@mysql.railway.internal:3306/railway';

const parsedUrl = url.parse(dbUrl);
const [user, password] = parsedUrl.auth.split(':');

const db = mysql.createConnection({
    host: parsedUrl.hostname,
    user: user,
    password: password,
    database: parsedUrl.pathname.replace('/', ''),
    port: parsedUrl.port,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
