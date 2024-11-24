require('dotenv').config();
const Pool = require('pg').Pool;

console.log(process.env.DB_USER, process.env.DB_HOST, process.env.DB_DATABASE);
const pool = new Pool({
  user: process.env.DB_USER,
  host:  process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 10,
});

module.exports = pool;