const User = require('../db/models/user');
const LocalStrategy = require('passport-local');

const strategy = new LocalStrategy(
    (username, password, cb) => {
        User.findOne({ username: username })
            .then(user => {
                if (!user || !user.checkPassword(password)) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
);

module.exports = strategy;