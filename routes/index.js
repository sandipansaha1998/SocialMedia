const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');
const homeController = require('../controllers/homeController');




console.log("Router started");
// Renders Home Page if authenticated else redirects to login page
router.get('/',passportLocal.checkAuthentication,homeController.home);
// User Profile page
router.get('/user-profile',passportLocal.checkAuthentication,homeController.user_profile);
// Login Page
router.get('/login',homeController.login);
// Signup Page
router.get('/sign-up',homeController.signUp);


router.use('/access',require('./access'));
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));


module.exports = router;