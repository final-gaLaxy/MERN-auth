var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
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
        type: Buffer,
        required: true
    }
});

userSchema.methods = {
    checkPassword: function(inputPassword) {
        return crypto.timingSafeEqual(
            crypto.pbkdf2Sync(inputPassword, this.salt, 310000, 32, 'sha256'),
            this.password
        );
    },
    hashPassword: function(plainPassword) {
        return crypto.pbkdf2Sync(plainPassword, this.salt, 310000, 32, 'sha256');
    }
}

userSchema.pre('save', function (next) {
    if (!this.password) {
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }

})

module.exports = User = mongoose.model('User', userSchema);