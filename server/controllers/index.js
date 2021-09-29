var models = require('../models/index.js')

module.exports = {
  getReviews: (req, res) => {
    console.log(req.query);
    models.getReviews(req.query, (err, data) => {
      if (err) {
        res.sendStatus(401);
      } else {
        res.json(data.rows);
      }
    })
  },

  getReviewsMeta: (req, res) => {
    console.log(req.query);
    models.getReviewsMeta(req.query, (err, data) => {
      if (err) {
        res.sendStatus(401);
      } else {
        res.json(data.rows);
      }
    })
  }
}