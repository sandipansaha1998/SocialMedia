const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const commentController = require('../controllers/commentController');

router.post('/create-comment',passportLocal.checkAuthentication,commentController.createComment);
module.exports = router;