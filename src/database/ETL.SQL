DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS photo CASCADE;
DROP TABLE IF EXISTS question CASCADE;

CREATE TABLE product (
    id int NOT NULL ,
    product_name varchar,
    slogan varchar,
    description varchar,
    category varchar(20),
    price int
);

COPY product(id,product_name,slogan,description,category,price) FROM '/private/tmp/questionsandanswers_data/product.csv' WITH (FORMAT csv, HEADER);

CREATE TABLE question (
    id int NOT NULL  ,
    product_id int,
    body varchar,
    date bigint,
    account_name  varchar,
    asker_email varchar,
    helpful_rating smallint NOT NULL CHECK ( helpful_rating between 0 and 100) DEFAULT 0,
    reported boolean DEFAULT FALSE
);

COPY question(id,product_id,body,date,account_name,asker_email,reported,helpful_rating) FROM '/private/tmp/questionsandanswers_data/questions.csv' WITH (FORMAT csv,HEADER);

CREATE TABLE answer (
    id integer NOT NULL ,
    body varchar,
    date bigint,
    question_id int NOT NULL,
    response_username varchar,
    helpful_rating smallint NOT NULL CHECK ( helpful_rating between 0 and 100) DEFAULT 0,
    reported boolean,
    response_email varchar
);

COPY answer(id,question_id,body,date,response_username, response_email,reported,helpful_rating) FROM '/private/tmp/questionsandanswers_data//answers.csv' WITH (FORMAT csv,HEADER);

CREATE TABLE photo (
 id int NOT NULL,
 answer_id int NOT NULL,
 url varchar
);

COPY photo(id,answer_id,url) FROM '/private/tmp/questionsandanswers_data/answers_photos.csv' WITH (FORMAT csv, HEADER);

ALTER TABLE product ADD PRIMARY KEY (id);
ALTER TABLE question ADD PRIMARY KEY (id), ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(id);
ALTER TABLE answer ADD PRIMARY KEY (id), ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question(id);
ALTER TABLE photo ADD PRIMARY KEY (id), ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answer(id);