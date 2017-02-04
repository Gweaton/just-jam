var mongoose = require('mongoose')

var Schema = mongoose.Schema

var messageSchema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
})

var Message = mongoose.model('Message', messageSchema)

module.exports = Message
