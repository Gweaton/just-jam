var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var index = require('./routes/index');
var users = require('./routes/users');
var jammers = require('./routes/jammers');
var chats = require('./routes/chats');
var config = require('./config/config');
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

app.set('views', path.join(__dirname, 'views'));
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
require('./socketServer.js')(io, sessionStore)

module.exports = app;
