const express = require('express');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const db = require('../database/db.js');


const app = express();
app.use(express.json());

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
    WHERE r.product_id_Product='${id}' AND r.reported ='false'
    LIMIT ${count} OFFSET ${count * page}`)
    .then((result) => {
      var obj = {
        "product": req.query.product_id,
        "page": page,
        "count": count,
        "results": result['rows']
      }
      res.status(200);
      res.json(obj)
    }) .catch((err)=> {
      console.error(err);
      res.sendStatus(400);
    })
})
app.get('/reviews/meta', (req,res) => {
  var id = Number(req.query.product_id);
  db.query(
    `WITH CharacteristicsData AS (
      SELECT c.name AS characteristic_name, c.id AS characteristic_id, ROUND(AVG(cr.char_value)::NUMERIC, 4) AS value
      FROM Characteristics c
      LEFT JOIN char_rating cr ON c.id = cr.characteristic_id
      WHERE c.product_id_Product = ${id}
      GROUP BY c.name, c.id
    )
    SELECT ${req.query.product_id} AS product_id,
    JSONB_BUILD_OBJECT(
    '1', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.rating HAVING r.rating = 1),
    '2', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.rating HAVING r.rating = 2),
    '3', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.rating HAVING r.rating = 3),
    '4', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.rating HAVING r.rating = 4),
    '5', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.rating HAVING r.rating = 5)
    ) AS ratings,
    JSONB_BUILD_OBJECT(
      '0', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.recommend HAVING r.recommend = true),
      '1', (SELECT COUNT(rating) FROM Review r WHERE r.product_id_Product = ${id} GROUP BY r.recommend HAVING r.recommend = false)
    ) AS recommend,
    (SELECT
    JSONB_OBJECT_AGG(characteristic_name,
     JSONB_BUILD_OBJECT(
        'id', characteristic_id,
        'value', value::TEXT
      )
    )
    FROM CharacteristicsData
  ) AS characteristics
  FROM Review rv
  WHERE rv.product_id_Product = ${id}
  `
  )
  .then((result) => {
    res.status(200);
    res.json(result.rows[0]);
  })
  .catch((err)=> {
    console.error(err);
    res.sendStatus(400);
  })
})
app.post('/reviews', (req, res) => {
  const reviewData = req.body;
  const date = new Date();
  let revid;
  db.query(`SELECT id
  FROM Review
  ORDER BY id DESC
  LIMIT 1
  `).then((results) => {
    revid = results.rows[0].id + 1;
    db.query(
      `INSERT INTO Review (id, product_id_Product, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [revid, reviewData.product_id, reviewData.rating, date.toISOString(), reviewData.summary, reviewData.body, reviewData.recommend, false, reviewData.name, reviewData.email, null, 0]
    )
  }) .then(() => {
    return db.query(`SELECT id
    FROM Photos
    ORDER BY id DESC
    LIMIT 1`)
  }) .then((result) => {
    var pid = result.rows[0].id + 10;
    const photoInserts = reviewData.photos.map((photoUrl) =>
      db.query('INSERT INTO Photos (id,review_id, photo_url) VALUES ($1, $2, $3)', [pid, revid, photoUrl])
    );
    return Promise.all(photoInserts);
  }) .then(() => {
    return db.query(`SELECT id
    FROM char_rating
    ORDER BY id DESC
    LIMIT 1`)
  }) .then((response) => {
    var cid = result.rows[0].id + 10;
    const characteristicInserts = Object.entries(reviewData.characteristics).map(([key, value]) =>
    db.query('INSERT INTO char_rating (id,characteristic_id, review_id, char_value) VALUES ($1, $2, $3, $4)', [cid, key, revid, value])
    );
    return Promise.all(characteristicInserts);
  }) .then(() => {
    res.sendStatus(201);
  }) .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  });
});
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


const PORT = process.env.PORT || 3005;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`)
module.exports = { app };