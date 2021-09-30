db = require("../database/index.js");

module.exports = {
  getReviews: (params, callback) => {
    var product_id = params.product_id;
    var count = params.count || 5;
    var sort = params.sort || 'helpful';
    if (sort === 'newest') {
      sort = 'date';
    } else if (sort === 'helpful') {
      sort = 'helpfulness';
    } else {
      sort = 'relevant';
    }
    var page = params.page || 1;
    var offset = (page - 1) * count;
    var fields = [product_id, sort, count, offset]
    console.log(fields);
    // var queryString = "SELECT *, ARRAY(json_build_object('id', p.id, 'url', p.url)) AS photos FROM reviews AS r LEFT OUTER JOIN reviews_photos AS p ON r.id=p.review_id WHERE product_id = $1 AND reported=False GROUP BY r.id ORDER BY $2 LIMIT $3 OFFSET $4"
    // 1. select reviews of specified product_id
    // 2. left outer join the table of reviews of specified product_id with reviews_photos that matches the review_id
    // 3. For each review in the joined table, we want to create a new table with qreview id and a photo property that is an object of photo id and url or null if there is no photo id
    // 4. Select reviews id and aggregate photo objects into photos array if they exist otherwise just want empty array as photos group by review id
    // 5. Select all the properties we want to return
    var queryString =
      "SELECT l.id, l.rating, l.summary, l.body, l.recommend, to_timestamp(l.date/1000) AS date, l.reviewer_name, l.helpfulness, k.photos FROM (SELECT t.id, coalesce(array_agg(t.photo) filter (where t.photo is not null), '{}') AS photos FROM (SELECT r.id, CASE WHEN p.id IS NULL THEN NULL ELSE json_build_object('id', p.id, 'url', p.url) END AS photo FROM (SELECT * FROM reviews AS r WHERE r.product_id = $1) AS r LEFT OUTER JOIN reviews_photos AS p ON r.id=p.review_id) AS t GROUP BY t.id) AS k JOIN reviews AS l ON k.id=l.id WHERE l.reported=False ORDER BY CASE WHEN $2 = 'date' THEN date ELSE helpfulness END DESC LIMIT $3 OFFSET $4";
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  },

  getReviewsMeta: (params, callback) => {
    var fields = [params.product_id]
    // 1. count ratings of reviews by product_id
    // 2. count recommended of reviews by product_id
    // 3. get average rating of a characteristic of a product by characteristic id, name, and product id
    // 4. make object with characteristic id and average rating of the characteristic and aggregate them by characteristic name
    // 5. join 1, 2, and 3 together then return the appropriate fields
    var queryString =
    `SELECT b.product_id, coalesce(k.ratings, '{}') AS ratings, coalesce(l.recommended, '{}') AS recommended, b.characteristics
      FROM (SELECT t.product_id, json_object_agg(t.rating, t.count) AS ratings
         FROM (SELECT product_id, rating, count(*)
           FROM reviews WHERE product_id = $1 GROUP BY rating, product_id) AS t GROUP BY t.product_id)
      AS k JOIN (SELECT r.product_id, json_object_agg(r.recommend, r.count) AS recommended
        FROM (SELECT product_id, recommend, count(*)
          FROM reviews WHERE product_id = $1 GROUP BY recommend, product_id) AS r GROUP BY r.product_id)
      AS l ON k.product_id=l.product_id
      RIGHT OUTER JOIN (SELECT m.product_id, json_object_agg(m.name, json_build_object('id', m.id, 'value', m.value)) AS characteristics
        FROM (SELECT z.product_id, z.id, z.name, AVG(y.value) as value
          FROM characteristic_reviews AS y RIGHT OUTER JOIN characteristics AS z ON y.characteristic_id = z.id WHERE z.product_id=$1 GROUP BY z.id, z.product_id, z.name)
        AS m GROUP BY m.product_id)
      AS b ON l.product_id=b.product_id`
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  },

  postReviews: (params, callback) => {
    var fields = [params.product_id, params.rating, params.summary, params.body, params.recommend, params.name, params.email];
    var photos = params.photos;
    var characteristics = params.characteristics;
    var queryString = `INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES($1, $2, $3, $4, $5, $6, $7)`
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  },

  updateHelpful: (params, callback) => {
    var fields = [params.review_id];
    var queryString = `UPDATE reviews SET helpfulness = helpfulness+1 WHERE id=$1`
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  },

  updateReport: (params, callback) => {
    var fields = [params.review_id];
    queryString = `UPDATE reviews SET reported = true WHERE id=$1;`
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    })
  }
};