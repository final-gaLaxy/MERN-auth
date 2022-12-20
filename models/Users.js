var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: Buffer,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);