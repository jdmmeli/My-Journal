const router = require('express').Router();

const { loadPs, createPs, deletePs } = require('../../controllers/ps-controller');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/ps').get(loadPs);

router.route('/post/:post').get(createPs);

router.route('/post/:post/:ps').get(deletePs);

module.exports = router;
