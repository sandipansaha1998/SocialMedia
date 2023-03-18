const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const accessController = require('../controllers/accessController');
router.post('/create-session',
passport.authenticate(
    'local',
    {failureRedirect:'/login'}
),accessController.createSession);
router.get('/destroy-session',accessController.destroySession);

module.exports = router;