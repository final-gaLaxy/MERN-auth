var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/Users');

passport.serializeUser((user, cb) => {
    return cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        return cb(null, user);
    });
});

passport.use(
    'signin',
    new LocalStrategy((username, password, cb) => {
        User.findOne({ username: username })
            .then(user => {
                if (!user) { return cb(null, false, { message: 'Incorrect username or password.'}); }

                crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
                    if (err) { return cb(err); }
                    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
                        return cb(null, false, { message: 'Incorrect username or password.'});
                    }

                    return cb(null, user);
                });
            })
            .catch(err => {
                return cb(err);
            });
    })
);

module.exports = passport;