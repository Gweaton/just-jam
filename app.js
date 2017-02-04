var express = require('express');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var jammers = require('./routes/jammers');
var chats = require('./routes/chats');
var config = require('./config');
var path = require('path')
var logger = require('morgan');

const Message = require('./models/message')
const User = require('./models/user')
const Chat = require('./models/chat')

// added
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

var server = require('http').Server(app)
var io = require('socket.io').listen(server)

if(process.env.NODE_ENV === "test"){
  db = mongoose.connect(config.test_db);
  server.listen(config.test_port);
  console.log("App listening on port "+config.test_port);
} else {
  db = mongoose.connect(config.db);
  server.listen(config.port);
  console.log("App listening on port "+config.port);
}
// view engine setup

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//added
app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})

app.use('/', index);
app.use('/users', users);
app.use('/chats', chats);
app.use('/jammers', jammers);

require('./config/passport')(passport);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket handling
io.sockets.on('connection', function(socket){
  socket.on('request_join', function(data){
    console.log("requesting join")
    //if this user is a user in the chat
      socket.join(data.id)
      // postAuthenticate(socket, data)
  })
  //sending a new message to a room
  socket.on('send message', function(data){
    io.sockets.in(data.room).emit('new message', { author: data.author, message: data.message });
    //save message to conversation(data.room)
    var newMessage = Message({ chatId: data.room, body: data.message, author: data.author})
    newMessage.save(function(err){
      if (err) throw err;
    })
  })

  socket.on('disconnect', function(data){
    socket.leave(data)
  })
})

//authenticating user when trying to connect to socket
// require('socketio-auth')(io, {
//   authenticate: function(socket, data, callback) {
//     //get credentials sent by the client
//     var username = data.username;
//     var password = data.password;
//
//     User.findOne({username:username}, function(err, user) {
//
//       //inform the callback of auth success/failure
//       if (err || !user) return callback(new Error("User not found"));
//       return callback(null, user.password == password);
//     });
//   }
// })

//
// function postAuthenticate(socket, data){
//   var username = data.username;
//
//   User.findOne({username:username}, function(err, user) {
//     socket.client.user = user;
//   });
// }
//
// function disconnect(socket){
//   console.log(socket.id + " disconnected")
// }


module.exports = app;
