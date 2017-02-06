var mongoose = require('mongoose')

var Schema = mongoose.Schema

var chatSchema = new Schema({
<<<<<<< HEAD
  sender: String,
  recipient: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
=======
  participants: [{
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String
  }],
>>>>>>> 4a3ef97f966c3c45f0340eae5aebd46bfafef205
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
})

var Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
