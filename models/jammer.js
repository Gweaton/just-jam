var mongoose = require('mongoose')

var Schema = mongoose.Schema

var jammerSchema = new Schema({
  name: { type: String, required: true },
  location: String,
  genres: String,
  instruments: String,
  bio: String,
  imagePath: { type: String, default: "/images/default-image.jpg" },
  audioPath: { type: String },
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

var Jammer = mongoose.model('Jammer', jammerSchema)

module.exports = Jammer
