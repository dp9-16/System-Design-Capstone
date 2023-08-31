const { Pool,Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
}

(async () => {
const pool = new Pool(config);

  await pool.connect()
//   // await pool.query(`CREATE DATABASE IF NOT EXISTS ratings`)
//   await pool.query(Product)
  await pool.query(Review)
//   await pool.query(Photos)
  await pool.end()
})();

// module.exports = pool;