var mongoose = require('mongoose')

var Schema = mongoose.Schema

var jammerSchema = new Schema({
  name: String,
  location: String,
  genres: String,
  instruments: String,
  bio: String,
  imagePath: String,
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

var Jammer = mongoose.model('Jammer', jammerSchema)

module.exports = Jammer
