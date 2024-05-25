const express = require('express');
const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', messages: messages });
});

router.get('/new', function(req, res) {
  res.render('new')
})

router.post('/new', function(req, res) {
  const {text, user} = req.body;
  messages.push({text, user, added: new Date()})
  res.redirect('/')
})

module.exports = router;
