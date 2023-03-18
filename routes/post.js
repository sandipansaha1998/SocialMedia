const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const postController = require('../controllers/postController');
router.post('/create-new-post',postController.create_new_post);

module.exports = router;