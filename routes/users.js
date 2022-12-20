var express = require('express');
var router = express.Router();
var passport = require('passport');
var crypto = require('crypto');
var User = require('../models/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { title: "Signup", error: false });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: "Login", error: false });
});

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
      return res.render('users', { username: user.username });
    })
  })(req, res, next);
  // if (login(username, req.body.password)) {
  //   res.render('users', {username: username});
  // } else {
  //   res.render('login', {title: "Login", error: true});
  // }
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
