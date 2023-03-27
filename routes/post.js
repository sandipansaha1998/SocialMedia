const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const postController = require('../controllers/postController');
router.post('/create',postController.create_new_post);
router.get('/destroy/:id',passportLocal.checkAuthentication,postController.destroy);

module.exports = router;