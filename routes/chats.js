const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')

const express = require('express');
const passport = require('passport');
const router = express.Router();

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//
// router.get('/', function (req, res) {
//   //page to show all chats for that user
//   // Chat.find({ participants: req.user._id }, function(err, chats){
//   //   if (err) return console.log(err)
//   //   res.render('/chats/index', { chats: chats });
//   })
// });

router.post('/new', urlencodedParser, function(req, res){
  //check if chat already exists else create a new chat
  var chat = Chat.findOne({'participants': [req.body.id, req.user]}, function(err, chat){
    if (chat){
      console.log("Retrieving chat")
      res.redirect(`${chat._id}`)
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
  Chat.findOne({'_id': req.params.id}, function(err, chat){
    res.render('chats/show', { chat: chat })
  })
})


module.exports = router;
