-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---

DELETE DATABASE IF NOT EXISTS ratings;
CREATE DATABASE ratings;

DROP TABLE IF EXISTS Product CASCADE;

CREATE TABLE Product (
  product_id SERIAL,
  prod_name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  descrip TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL,
  PRIMARY KEY (product_id)
);

-- ---
-- Table 'Review'
--
-- ---

DROP TABLE IF EXISTS Review CASCADE;

CREATE TABLE Review (
  id SERIAL,
  product_id_Product INTEGER,
  rating INTEGER NOT NULL,
  rev_date BIGINT NOT NULL,
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

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS Photos CASCADE;

CREATE TABLE Photos (
  id SERIAL,
  review_id INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS Characteristics CASCADE;

CREATE TABLE Characteristics (
  id SERIAL,
  product_id_Product INTEGER,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'char_rating'
--
-- ---

DROP TABLE IF EXISTS char_rating CASCADE;

CREATE TABLE char_rating (
  id SERIAL,
  characteristic_id INTEGER,
  review_id INTEGER NOT NULL,
  char_value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Review ADD FOREIGN KEY (product_id_Product) REFERENCES Product (product_id);
ALTER TABLE Photos ADD FOREIGN KEY (review_id) REFERENCES Review (id);
ALTER TABLE Characteristics ADD FOREIGN KEY (product_id_Product) REFERENCES Product (product_id);
ALTER TABLE char_rating ADD FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id);
ALTER TABLE char_rating ADD FOREIGN KEY (review_id) REFERENCES Review (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Characteristics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE char_rating ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Product (product_id) VALUES
-- ('');
-- INSERT INTO Review (id,product_id_Product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO Photos (id,review_id,url) VALUES
-- ('','','');
-- INSERT INTO Characteristics (id,product_id_Product,name) VALUES
-- ('','','');
-- INSERT INTO char_rating (id,characteristic_id,review_id,value) VALUES
-- ('','','','');

-- ---
-- Copying Data
-- ---

\COPY Product FROM '../data/product.csv' DELIMITER ',' CSV HEADER;
\COPY Review FROM '../data/reviews.csv' DELIMITER ',' CSV HEADER;
\COPY Photos FROM '../data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\COPY Characteristics FROM '../data/characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY char_rating FROM '../data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;