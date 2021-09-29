DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE reviews (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT,
  summary VARCHAR(200),
  body VARCHAR(2048),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name varchar(64),
  reviewer_email varchar(320),
  response varchar(200),
  helpfulness int
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  name varchar(20)
);

CREATE TABLE characteristic_reviews (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  characteristic_id INT NOT NULL REFERENCES characteristics (id),
  review_id INT NOT NULL REFERENCES reviews (id),
  value INT NOT NULL
);

CREATE TABLE reviews_photos (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  review_id INT NOT NULL REFERENCES reviews (id),
  url varchar(2048) NOT NULL
);

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/chris/hackreactor/SDC-reviews/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/home/chris/hackreactor/SDC-reviews/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/home/chris/hackreactor/SDC-reviews/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos(id, review_id, url)
FROM '/home/chris/hackreactor/SDC-reviews/reviews_photos.csv'
DELIMITER ','
CSV HEADER;