const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const likeController = require('../controllers/likeController');

router.post('/',likeController.index);
module.exports=router;