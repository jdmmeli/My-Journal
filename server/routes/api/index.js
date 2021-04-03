const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')
const psRoutes = require('./ps-routes');
const { route } = require('./user-routes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/ps', psRoutes);
// router.use('/posts', postRoutes);

module.exports = router;
