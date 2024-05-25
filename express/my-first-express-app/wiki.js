const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.send('Wiki home page');
});

router.get('/about', (req, res) => {
    res.send('About wiki page')
})

module.exports = router;