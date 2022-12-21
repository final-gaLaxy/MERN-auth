var express = require('express');
var router = express.Router();
var passport = require('passport');
var crypto = require('crypto');
var User = require('../models/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) { return res.render('users', { username: req.user.username }); }
  res.redirect('/users/login');
});

router.get('/signup', (req, res, next) => {
  if (req.isAuthenticated()) { return res.redirect('/users'); }
  res.render('signup', { title: "Signup", error: false });
});

router.get('/login', (req, res, next) => {
  if (req.isAuthenticated()) { return res.redirect('/users'); }
  res.render('login', { title: "Login", error: false });
});

router.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) { return next(err); }
    res.redirect('/users/login');
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('signin', (err, user, info) => {
    if (err) {
      return res.render('error', {
        message: 'Something went wrong',
        status: 400,
        error: err
      });
    }
    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: true
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.render('error', {
          message: 'Couldn\'t Login',
          status: 400,
          error: err
        });
      }
      if (req.body.remember) {
        var days = 30 * 24 * 60 * 60 * 1000;
        req.session.cookie.expires = new Date(Date.now() + days);
        req.session.cookie.maxAge = days;
      }
      return res.redirect('/users');
    })
  })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  User.findOneAndUpdate({ username: req.body.username }, {}, { new: true })
    .then(user => {
      if (user) {
        return res.render('signup', { title: 'Signup', error: { message: 'User already Exists' } });
      }

      var { email, username, password } = req.body;
      user = new User({ email, username, password });
      user.salt = crypto.randomBytes(16);
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
        if (err) {
          return res.render('error', {
            message: 'Something went wrong',
            status: 400,
            error: err
          });
        }
        user.password = hashedPassword;
        user.save((err) => {
          if (!err) {
            return res.render('signup', { title: 'Signup', success: true });
          }
          return res.render('error', {
            message: 'Something went wrong',
            status: 400,
            error: err
          });
        });
      });
    })
    .catch(err => {
      return res.render('error', {
        message: 'Something went wrong',
        status: 400,
        error: err
      });
    });
});


module.exports = router;
