var mongoose = require('mongoose')

var Schema = mongoose.Schema

var chatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

var Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
