require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  //Valores do arquivo '.env'
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWD,
  port: process.env.DB_PORT,
});

module.exports = pool
