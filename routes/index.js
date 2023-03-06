const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');




console.log("Router started");
router.get('/',homeController.home);
router.get('/user-profile',homeController.user_profile);
module.exports = router;