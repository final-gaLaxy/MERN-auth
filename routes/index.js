var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login');
  // res.render('index', { title: 'Login', error: false });
});

module.exports = router;
