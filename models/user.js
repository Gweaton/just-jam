var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  username: String, unique: true
  email: String,
  location: String,
  genres: String,
  instruments: String,
  bio: String,
  imagePath: String
})

var User = mongoose.model('User', userSchema)

module.exports = User
