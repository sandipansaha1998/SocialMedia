const express = require('express');
const router = express.Router();
const passportLocal = require('../config/passport-local');
const passport = require('passport');

const userController = require('../controllers/userController');

router.post('/create',userController.createUser);
router.post('/update/:id',passportLocal.checkAuthentication,userController.update)
module.exports=router;
