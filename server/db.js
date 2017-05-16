var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log(222222)
});

var userSchema = new mongoose.Schema({
  name: String,
  pwd: String
});

var blogInformationSchema = new mongoose.Schema({
  name: String,
  description: String,
  introduction: String
});

var articleSchema = new mongoose.Schema({
  title: String,
  date: Date,
  content: String,
  state: String,
  label: String
});

var Models = {
  User: mongoose.model('User', userSchema),
  BlogInformation: mongoose.model('BlogInformation', blogInformationSchema),
  Article: mongoose.model('Article', articleSchema)
};

module.exports = Models;
