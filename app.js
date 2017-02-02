var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var app = express();
var path = require('path')

var logger = require('morgan');

// added
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

// var configDB = require('./config/database.js');
// mongoose.connect(configDB.url);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//added
app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);

// require('./config/passport')(passport);

if(process.env.NODE_ENV === "test"){
    db = mongoose.connect(config.test_db);
  	app.listen(config.test_port);
  	console.log("App listening on port "+config.test_port);
} else {
   	db = mongoose.connect(config.db);
   	app.listen(config.port);
   	console.log("App listening on port "+config.port);
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
