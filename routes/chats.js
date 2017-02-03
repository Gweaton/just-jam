var express = require('express');
var passport = require('passport');
var router = express.Router();
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

router.get('/', function (req, res) {
  res.render('/chats/index');
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('a user connected');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

module.exports = router;
