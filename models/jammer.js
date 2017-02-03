var mongoose = require('mongoose')

var Schema = mongoose.Schema

var jammerSchema = new Schema({
  name: String,
  location: String,
  genres: String,
  instruments: String,
  bio: String,
  imagePath: { type: String, default: "/images/default-image.jpg" },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

var Jammer = mongoose.model('Jammer', jammerSchema)

module.exports = Jammer
