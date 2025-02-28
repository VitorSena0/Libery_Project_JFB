require('dotenv').config(); // Certifique-se de que dotenv está sendo usado
const { Pool } = require('pg');

console.log("Usuário:", process.env.DB_USER); // Para depuração
console.log("Senha:", process.env.DB_PASSWD); // Para depuração

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWD,
    port: process.env.DB_PORT
});

module.exports = pool;
