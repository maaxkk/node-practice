const express = require('express');
const UserController = require('../controllers/userController.js');
const passport = require('passport');
const router = express.Router();

router.get('/login', UserController.loginGET);
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/register' }));
router.get('/register', UserController.registerGET);
router.get('/becomeMember', UserController.becomeMember);
router.post('/register', UserController.registerPOST);

module.exports = router;
