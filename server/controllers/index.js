var models = require('../models/index.js')

module.exports = {
  getReviews: (req, res) => {
    models.getReviews(req.query)
    .then(data => {
      var product_id = req.query.product_id;
      var count = req.query.count || 5;
      var page = req.query.page || 1;
      var result = {
        'product': product_id,
        'page': page,
        'count': count,
        'results': data.rows
      }
      return result;
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },

  getReviewsMeta: (req, res) => {
    models.getReviewsMeta(req.query)
    .then(data => {
      res.json(data.rows[0]);
    })
    .catch(err => {
      res.sendStatus(400);
    });
  },

  postReviews: (req, res) => {
    models.postReviews(req.body)
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    });
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