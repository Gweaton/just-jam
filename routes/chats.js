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
  Chat.find({participants: req.user}, function(err, chats) {
    if (err) throw err;
    chats.forEach(function(chat) {
      //finds us
      Jammer.findOne({ addedBy: chat.participants[0] }, function(err, jammer1) {
        console.log(chat.participants)
        Jammer.findOne({addedBy: chat.participants[1]}, function(err, jammer2) {
          res.render('chats/index', { chats: chats, jammer1: jammer1, jammer2: jammer2 })
        });
    })
  })
});

})

router.post('/new', urlencodedParser, function(req, res){
  //check if chat already exists else create a new chat
  var chat = Chat.findOne({ $and:[ {participants:req.body.id}, {participants:req.user} ]}, function(err, chat){
    if (chat){
      console.log("Retrieving chat")
      res.redirect(`/chats/${chat._id}`)
    } else {
    console.log("Making new chat")
    var newChat = Chat()
    newChat.participants.push(req.body.id)
    newChat.participants.push(req.user)
    newChat.save(function(err){
      if (err) throw err;
      res.redirect(`/chats/${newChat._id}`);
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
