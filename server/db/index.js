var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
var dbUrl = "mongodb://127.0.0.1:27017/mern-passport";

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', () => {
  console.log('Could not connect');
});
db.once('open', () => {
  console.log('Successfully connected to db');
});

module.exports = db;