var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var app = express();
var path = require('path')

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

if(!module.parent) {
  if(process.env.NODE_ENV === "test"){
      db = mongoose.connect(config.test_db);
    	app.listen(config.test_port);
    	console.log("App listening on port "+config.test_port);
  } else {
     	db = mongoose.connect(config.db);
     	app.listen(config.port);
     	console.log("App listening on port "+config.port);
  }
}

module.exports = app;
