var methods = require('../methods.js')

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
  Chat.find({ participants: req.user }, function(err, chats) {
    res.render('chats/index', { chats: chats })
  })
});

router.post('/new', methods.isLoggedIn, urlencodedParser, function(req, res){
  //check if the user is signed in
  if (!req.user){
    res.redirect('/')
  } else {
    //check if chat already exists else create a new chat
    var chat = Chat.findOne({ $and:[ {participants: {id: req.body.id, name: req.body.name }}, {participants:req.user} ]}, function(err, chat){
      if (chat){
        console.log("Retrieving chat")
        res.redirect(`/chats/${chat._id}`)
      } else {
        console.log("Making new chat")
        methods.createNewChat(req, res)
      }
    })
  }

})

router.get('/:id', function(req, res){
  Chat.findOne({'_id': req.params.id}, function(err, chat){
    if (err) throw err;
    var messages = Message.find({ chatId: chat._id }, function(err, messages){
      Jammer.findOne({ addedBy: req.user }, function(err, jammer){
        res.render('chats/show', { chat: chat, messages: messages, jammer: jammer })
      })
    })
  })
})

module.exports = router;
