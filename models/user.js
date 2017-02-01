var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  location: String,
  genres: String,
  instruments: String,
  bio: String
})

var User = mongoose.model('User', userSchema)

module.exports = User
