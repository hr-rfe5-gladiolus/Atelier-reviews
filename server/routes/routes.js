var router = require('express').Router();
var controller = require('../controllers/index.js')

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getReviewsMeta);


module.exports = router;