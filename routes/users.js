var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {title: "Signup", error: false});
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: "Login", error: false});
});

router.post('/login', function(req, res, next) {
  const username = req.body.username;
  if (login(username, req.body.password)) {
    res.render('users', {username: username});
  } else {
    res.render('login', {title: "Login", error: true});
  }
});

router.post('/signup', function(req, res, next) {
  const username = req.body.username;
  res.render('signup', {title: "Signup", error: true})
});

module.exports = router;
