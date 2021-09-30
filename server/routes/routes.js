var router = require('express').Router();
var controller = require('../controllers/index.js')

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getReviewsMeta);

router.post('/reviews', controller.postReviews);

router.put('/reviews/:review_id/helpful', controller.updateHelpful);

router.put('/reviews/:review_id/report', controller.updateReport);


module.exports = router;