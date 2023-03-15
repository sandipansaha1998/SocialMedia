const express = require('express');
const passportLocal = require('../config/passport-local');
const router = express.Router();
const homeController = require('../controllers/homeController');
const passport = require('passport');



console.log("Router started");
router.get('/',passportLocal.checkAuthentication,homeController.home);
router.get('/user-profile',passportLocal.checkAuthentication,homeController.user_profile);
router.get('/login',homeController.login);
router.post('/login',
passport.authenticate(
    'local',
    {failureRedirect:'/login'}
),homeController.createSession);
router.get('/sign-up',homeController.signUp);
router.post('/sign-up',homeController.createUser);
router.get('/sign-out',homeController.destroySession);

module.exports = router;