const express = require('express');
const router = express.Router();
const mockData = require('../utils/mockPosts');

const userRouter = require('./userRouter');
const mockSections = ['Message board', 'Home', 'Register', 'Login', 'Become member'];

router.use('/user', userRouter);

router.get('/', (req, res, next) => {
    res.render('main_page', { mockData: mockData, mockSections: mockSections });
});

module.exports = router;
