const express = require('express');
const router = express.Router();
const controller = require('./authController')
const {body} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration',
    body('username', "Username can't be empty")
        .notEmpty(),
    body('password', 'Password must be min 4 and max 10 length')
        .isLength({min: 4, max: 10})
    ,controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router;