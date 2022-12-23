var passport = require('passport');
var LocalStrategy = require('./localStrategy');
var User = require('../db/models/user');

passport.serializeUser((user, cb) => {
    return cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, 'email username', (err, user) => {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
});

passport.use(LocalStrategy);

module.exports = passport;