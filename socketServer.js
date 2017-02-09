var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var passport = require('passport');
var passportSocketIo = require('passport.socketio')
var MongoStore = require('connect-mongo')(session);
var Chat = require('./models/chat')
var Message = require('./models/message')

module.exports = function(io, sessionStore){
// socket authentication
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    secret: 'shhsecret',
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  }))

  //socket handling
  io.sockets.on('connection', function(socket){
    socket.on('request_join', function(data){
      console.log("requesting join")
      if(socket.request.user.logged_in){
        socket.join(data.id)
      }
    })
    //sending a new message to a room
    socket.on('send message', function(data){
      console.log(data)
      io.sockets.in(data.room).emit('new message', { author:data.author, message: data.message });
      //save message to conversation(data.room)
      var chat = Chat.findOne({'_id': data.room}, function(err, chat){
        if (err) throw err;
        var message = Message({ chatId: data.room, body: data.message, author: data.author})
        message.save(function(err){
          if (err) throw err
          chat.messages.push(message)
          chat.save(function(err){
            if (err) throw err
          })
        })
      })
    })

    socket.on('disconnect', function(data){
      socket.leave(data)
    })
  })

  function onAuthorizeSuccess(data, accept){
    console.log('Successful connection to socket.io');
    accept();
  }

  function onAuthorizeFail(data, message, error, accept){
    if(error)
      throw new Error(message);
    console.log('Failed connection to socket.io:', message);
    if(error)
      accept(new Error(message));
  }
}
