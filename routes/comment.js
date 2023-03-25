const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const commentController = require('../controllers/commentController');

router.post('/create-comment',passportLocal.checkAuthentication,commentController.createComment);
router.get('/destroy/:id',passportLocal.checkAuthentication,commentController.destroy);
module.exports = router;