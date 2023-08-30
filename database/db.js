const { Pool,Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
}
const Product = `
  CREATE TABLE IF NOT EXISTS product(
    product_id INT,
    product_name VARCHAR(255),
    PRIMARY KEY(product_id)
)`;

const Review = `
  CREATE TABLE IF NOT EXISTS review(
    review_id INT,
    rev_product_id INT,
    rating INT,
    date VARCHAR(255),
    summary VARCHAR(255),
    body VARCHAR(1000),
    recommend boolean,
    reviewer_name VARCHAR(255),
    review_email VARCHAR(255),
    response VARCHAR(1000),
    helpfulness INT,
    PRIMARY KEY(review_id),
    FOREIGN KEY (rev_product_id) REFERENCES product (product_id)
)`;

const Photos = `
  CREATE TABLE IF NOT EXISTS photos(
    photo_id INT,
    product_name VARCHAR(255),
    ph_review_id INT,
    PRIMARY KEY(photo_id),
    FOREIGN KEY (ph_review_id) REFERENCES review (review_id)
)`;

// (async () => {
const pool = new Pool(config);

//   await pool.connect()
//   // await pool.query(`CREATE DATABASE IF NOT EXISTS ratings`)
//   await pool.query(Product)
//   await pool.query(Review)
//   await pool.query(Photos)
//   await pool.end()
// })();
module.exports = pool;