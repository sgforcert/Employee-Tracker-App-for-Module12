// Create our DataBase Connection
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'sg6on',
    password: 'Asu@2024',
    database: 'company_db',
    post: 5432
},
    console.log("DB Connected...")
);

pool.connect();

module.exports = pool;