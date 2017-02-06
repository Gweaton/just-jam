var mongoose = require('mongoose')

var Schema = mongoose.Schema

var chatSchema = new Schema({
  sender: String,
  recipient: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
})

var Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
