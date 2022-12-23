var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../db/models/user');
var passport = require('../passport');
var fs = require('fs');

router.get('/user', function (req, res, next) {
    if (req.user) {
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
});

router.post('/signup', (req, res, next) => {
    const { email, username, password } = req.body;
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                return res.json({
                    error: `Sorry, a user already exists with the username ${username}`
                });
            }
            const salt = crypto.randomBytes(32);
            const newUser = new User({
                email: email,
                username: username,
                password: password,
                salt: salt
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                return res.status(201).send({message: "Successfully create User"});
            });
        })
        .catch((err) => {
            return res.json(err);
        });
});

router.post(
    '/login',
    function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        delete cleanUser.salt;
        delete cleanUser.password;
        if (req.body.remember) {
            var days = 30 * 24 * 60 * 60 * 1000;
            req.session.cookie.expires = new Date(Date.now() + days);
            req.session.cookie.maxAge = days;
        }
        res.json({ user: cleanUser });
    }
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.json({ msg: 'Logging you out.' });
    } else {
        return res.json({ msg:  'You are not logged in.' });
    }
})

module.exports = router;
