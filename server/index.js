const express = require('express');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const db = require('../database/db.js');


const app = express();
app.use(express());

var sql = fs.readFileSync(path.join(__dirname, '../database/copy.sql')).toString();

db.connect(function (err, client, done) {
  if (err) {
    console.error(err);
  }
  done();
})

//router functions
app.get('/reviews/', (req,res) => {
  var id = Number(req.query.product_id);
  var count = Number(req.query.count) || 5;
  var page = Number(req.query.page) || 0;
  db.query(`SELECT r.*,
   (SELECT
    JSONB_AGG(
      JSONB_BUILD_OBJECT(
        'id', p.id,
        'url', p.photo_url
      )
    )
    FROM Photos p
    WHERE r.id = p.review_id
    LIMIT 10) AS photos
    FROM Review r
    WHERE r.product_id_Product='${id}' AND r.reported ='false'`)
    .then((result) => {
      var obj = {
        "product": req.query.product_id,
        "page": page,
        "count": count,
        "results": result['rows']
      }
      res.json(obj)
    }) .catch((err)=> {
      console.error(err);
      res.sendStatus(400);
    })
})
app.get('/reviews/meta', (req,res) => {
  var id = Number(req.query.product_id);
  db.query(
    `SELECT
    JSONB_BUILD_OBJECT`
  )
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err)=> {
    console.error(err);
    res.sendStatus(400);
  })
})

// app.post('/reviews')
app.put('/reviews/:review_id/helpful', (req,res) => {
  var id = Number(req.params.review_id);
  db.query(`UPDATE Review r SET helpfulness = helpulness+1 WHERE r.id='${id}'`)
  .then(() => {
    res.sendStatus(204);
  }) .catch((err)=> {
    console.error(err);
    res.sendStatus(400);
  })
})
app.put('/reviews/:review_id/report', (req,res) => {
  var id = Number(req.params.review_id);
  db.query(`UPDATE Review r SET reported = true WHERE r.id='${id}'`)
  .then(() => {
    res.sendStatus(204);
  }) .catch((err)=> {
    console.error(err);
    res.sendStatus(400);
  })
})


// db.end()


const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`)