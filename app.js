var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var index = require('./routes/index');
var users = require('./routes/users');
var jammers = require('./routes/jammers');
var chats = require('./routes/chats');
var config = require('./config');
var path = require('path')
var logger = require('morgan');

var Message = require('./models/message')
var User = require('./models/user')
var Chat = require('./models/chat')

// added
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var app = express();

var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var passportSocketIo = require('passport.socketio')
var sessionStore = new MongoStore({mongooseConnection: mongoose.connection})

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
app.use(session({
  secret: 'shhsecret',
  store: sessionStore
}));
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

//socket authentication
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
    //if the user is authorized
    if(socket.request.user.logged_in){
        socket.join(data.id)
      }
    // }
  })
  //sending a new message to a room
  socket.on('send message', function(data){
    console.log(data)
    io.sockets.in(data.room).emit('new message', { author:data.author, message: data.message });
    //save message to conversation(data.room)
    var chat = Chat.findOne({'_id': data.room}, function(err, chat){
      if (err) throw err;
      //eventually need to pass user to message model
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
  console.log('successful connection to socket.io');
  accept();
}

function onAuthorizeFail(data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);
  if(error)
    accept(new Error(message));
}

module.exports = app;
