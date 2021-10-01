var models = require('../models/index.js')

module.exports = {
  getReviews: (req, res) => {
    models.getReviews(req.query)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },

  getReviewsMeta: (req, res) => {
    models.getReviewsMeta(req.query)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },

  postReviews: (req, res) => {
    models.postReviews(req.body, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(data.rows);
      }
    })
  },

  updateHelpful: (req, res) => {
    models.updateHelpful(req.params)
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },

  updateReport: (req, res) => {
    models.updateReport(req.params)
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    })
  }
}