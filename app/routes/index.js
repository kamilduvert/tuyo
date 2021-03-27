const express = require('express');

const postRouter = require('./post');
const authRouter = require('./auth');

const router = express.Router();

router.use('/post', postRouter);
router.use('/auth', authRouter);

module.exports = router;