var models = require('../models/index.js')

module.exports = {
  getReviews: (req, res) => {
    console.log(req.query);
    models.getReviews(req.query, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(data.rows);
      }
    })
  },

  getReviewsMeta: (req, res) => {
    console.log(req.query);
    models.getReviewsMeta(req.query, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(data.rows);
      }
    })
  },

  postReviews: (req, res) => {
    console.log(req.body);
    models.postReviews(req.body, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        console.log(data);
        res.json(data.rows);
      }
    })
  },

  updateHelpful: (req, res) => {
    models.updateHelpful(req.params, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  },

  updateReport: (req, res) => {
    models.updateReport( req.params, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
  }
}