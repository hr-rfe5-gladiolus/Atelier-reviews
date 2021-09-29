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
      "SELECT l.id, l.rating, l.summary, l.body, l.recommend, l.date, l.reviewer_name, l.helpfulness, k.photos FROM (SELECT t.id, coalesce(array_agg(t.photo) filter (where t.photo is not null), '{}') AS photos FROM (SELECT r.id, CASE WHEN p.id IS NULL THEN NULL ELSE json_build_object('id', p.id, 'url', p.url) END AS photo FROM (SELECT * FROM reviews AS r WHERE r.product_id = $1) AS r LEFT OUTER JOIN reviews_photos AS p ON r.id=p.review_id) AS t GROUP BY t.id) AS k JOIN reviews AS l ON k.id=l.id WHERE l.reported=False ORDER BY CASE WHEN $2 = 'date' THEN date ELSE helpfulness END DESC LIMIT $3 OFFSET $4;";
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  },

  getReviewsMeta: (params, callback) => {
    var fields = [params.product_id]
    var queryString = '(SELECT rating, count(*) FROM reviews WHERE product_id = $1 GROUP BY rating) (SELECT recommend, count(*) FROM reviews WHERE product_id = $1 GROUP BY recommend)';
    db.query(queryString, fields, (err, res) => {
      console.log(err);
      callback(err, res);
    });
  }
};
