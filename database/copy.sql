DROP DATABASE IF EXISTS ratings;
CREATE DATABASE ratings;
\c ratings;
CREATE TABLE Product (
  product_id SERIAL,
  prod_name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  descrip TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL,
  PRIMARY KEY (product_id)
);
CREATE TABLE Review (
  id SERIAL,
  product_id_Product INTEGER,
  rating INTEGER NOT NULL DEFAULT 0,
  date BIGINT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
CREATE TABLE Photos (
  id SERIAL,
  review_id INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE Characteristics (
  id SERIAL,
  product_id_Product INTEGER,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE char_rating (
  id SERIAL,
  characteristic_id INTEGER,
  review_id INTEGER NOT NULL,
  char_value INTEGER NOT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE Review ADD FOREIGN KEY (product_id_Product) REFERENCES Product (product_id);
ALTER TABLE Photos ADD FOREIGN KEY (review_id) REFERENCES Review (id);
ALTER TABLE Characteristics ADD FOREIGN KEY (product_id_Product) REFERENCES Product (product_id);
ALTER TABLE char_rating ADD FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id);
ALTER TABLE char_rating ADD FOREIGN KEY (review_id) REFERENCES Review (id);
\COPY Product FROM './data/product.csv' DELIMITER ',' CSV HEADER;
\COPY Review FROM './data/reviews.csv' DELIMITER ',' CSV HEADER;
\COPY Photos FROM './data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\COPY Characteristics FROM './data/characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY char_rating FROM './data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE Review ALTER column date TYPE TIMESTAMP USING TIMEZONE('UTC', TO_TIMESTAMP(date / 1000));
SELECT setval('review_id_seq', (SELECT MAX(r.id) FROM Review r)+1);
SELECT setval('photos_id_seq', (SELECT MAX(ph.id) FROM Photos ph)+1);
SELECT setval('characteristics_id_seq', (SELECT MAX(c.id) FROM Characteristics c)+1);
SELECT setval('char_rating_id_seq', (SELECT MAX(cr.id) FROM char_rating cr)+1);
CREATE INDEX idx_rid ON Review (id);
CREATE INDEX idx_rp_id ON Review (product_id_Product);
CREATE INDEX idx_r_rating ON Review (rating);
CREATE INDEX idx_r_reported ON Review (reported);
CREATE INDEX idx_pid ON Photos (id);
CREATE INDEX idx_pr_id ON Photos (review_id);
CREATE INDEX idx_p_url ON Photos (photo_url);
CREATE INDEX idx_cid ON Characteristics (id);
CREATE INDEX idx_cp_id ON Characteristics (product_id_Product);

CREATE INDEX idx_crid ON char_rating (characteristic_id);
CREATE INDEX idx_cr_val ON char_rating (char_value);
