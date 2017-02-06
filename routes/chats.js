const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')
const Jammer = require('../models/jammer')

const express = require('express');
const passport = require('passport');
const router = express.Router();

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res){
<<<<<<< HEAD
  Chat.find({ participants: req.user }, function(err, chats){
=======
  Chat.find({ participants: req.user }, function(err, chats) {
>>>>>>> 4a3ef97f966c3c45f0340eae5aebd46bfafef205
    res.render('chats/index', { chats: chats })
  })
});

router.post('/new', urlencodedParser, function(req, res){
  //check if chat already exists else create a new chat
<<<<<<< HEAD
  var chat = Chat.findOne({ $and:[{ participants: req.body.id} ,{ participants: req.user }] }, function(err, chat){
=======
  var chat = Chat.findOne({ $and:[ {participants: {id: req.body.id, name: req.body.name }}, {participants:req.user} ]}, function(err, chat){
>>>>>>> 4a3ef97f966c3c45f0340eae5aebd46bfafef205
    if (chat){
      console.log("Retrieving chat")
      res.redirect(`/chats/${chat._id}`)
    } else {
<<<<<<< HEAD
      console.log("Making new chat")
      var newChat = Chat()
      newChat.participants.push(req.body.id)
      newChat.participants.push(req.user)
      newChat.sender = req.body.name
      newChat.recipient = req.user.name
      newChat.save(function(err){
        if (err) throw err;
        res.redirect(`/chats/${newChat._id}`);
=======
    console.log("Making new chat")
    var newChat = Chat()
    Jammer.findOne({ addedBy: req.body.id }, function(err, jammer) {
      if (err) throw err;
      newChat.participants.push({id: req.body.id, name: jammer.name })
    })
    Jammer.findOne({ addedBy: req.user }, function(err, jammer) {
      if (err) throw err;
      newChat.participants.push({id: req.user, name: jammer.name })
    })
    newChat.save(function(err){
      if (err) throw err;
      res.redirect(`/chats/${newChat._id}`);
>>>>>>> 4a3ef97f966c3c45f0340eae5aebd46bfafef205
      })
    }
  })

})

router.get('/:id', function(req, res){
  //find specific chat
  Chat.findOne({'_id': req.params.id}, function(err, chat){
    if (err) throw err;
    var messages = Message.find({ chatId: chat._id }, function(err, messages){
      Jammer.findOne({ addedBy: req.user }, function(err, jammer){
        res.render('chats/show', { chat: chat, messages: messages, jammer: jammer })
      })
    })
    //not sure how to pass through user to the view to populate author
  })
})


module.exports = router;
