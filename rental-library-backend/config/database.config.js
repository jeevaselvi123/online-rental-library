const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'jeevadharani',
  host:  'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

console.log(pool);
module.exports = pool;