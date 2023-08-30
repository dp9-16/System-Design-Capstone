const express = require('express');
require('dotenv').config();
const pool = require('../database/db.js')

const app = express();

const PORT = process.env.PORT || 3000;

async () => {
  pool.connect();
  pool.end();
}

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`)