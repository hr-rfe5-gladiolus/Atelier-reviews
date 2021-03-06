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
CREATE INDEX reviews_product_id_index ON reviews(product_id DESC);

CREATE TABLE characteristics (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  product_id INT NOT NULL,
  name varchar(20)
);
CREATE INDEX characteristics_product_id_index ON characteristics(product_id DESC);


CREATE TABLE characteristic_reviews (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  characteristic_id INT NOT NULL REFERENCES characteristics (id),
  review_id INT NOT NULL REFERENCES reviews (id),
  value INT NOT NULL
);
CREATE INDEX characteristic_reviews_review_id ON characteristic_reviews(review_id DESC);
CREATE INDEX characteristic_reviews_characteristic_id ON characteristic_reviews(characteristic_id DESC);


CREATE TABLE reviews_photos (
  id SERIAL NOT NULL UNIQUE PRIMARY KEY,
  review_id INT NOT NULL REFERENCES reviews (id),
  url varchar(2048) NOT NULL
);
CREATE INDEX reviews_photos_review_id ON reviews_photos(review_id);


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


SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));
SELECT setval('reviews_photos_id_seq', (SELECT MAX(id) FROM reviews_photos));
SELECT setval('characteristic_reviews_id_seq', (SELECT MAX(id) FROM characteristic_reviews));
SELECT setval('characteristics_id_seq', (SELECT MAX(id) FROM characteristics));