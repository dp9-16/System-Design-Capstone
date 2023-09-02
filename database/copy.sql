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
DROP TABLE IF EXISTS Review CASCADE;
CREATE TABLE Review (
  id SERIAL,
  product_id_Product INTEGER,
  rating INTEGER NOT NULL,
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
DROP TABLE IF EXISTS Photos CASCADE;
CREATE TABLE Photos (
  id SERIAL,
  review_id INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS Characteristics CASCADE;
CREATE TABLE Characteristics (
  id SERIAL,
  product_id_Product INTEGER,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS char_rating CASCADE;
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