var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var Message = require('./models/message')
var User = require('./models/user')
var Chat = require('./models/chat')
var Jammer = require('./models/jammer')
var index = require('./routes/index');

module.exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    return next(null, false, req.flash('notLoggedIn', 'Please sign up or log in to continue.'));
    res.redirect('/');
  }
}

module.exports.createNewJammer = function(req){
  var newJammer = Jammer(req.body)
  if (req.files['image']) { newJammer.imagePath = req.files['image'][0]['location']}
  if (req.files['audio']) { newJammer.audioPath = req.files['audio'][0]['location']}
  newJammer.addedBy = req.user
  newJammer.save(function(err) {
    if (err) throw err;
  });
  return newJammer
}

module.exports.assignJammerToUser = function(req, jammer){
  req.user.jammer = jammer
  req.user.name = req.body.name
  req.user.save(function(err){
    if (err) throw err;
  })
}

module.exports.updateJammer = function(req){
  Jammer.findOneAndUpdate( { '_id': req.params.id}, req.body, {new: true}, function(err, res){
    if (err) throw err;
    if (req.files['image']) { res.imagePath = req.files['image'][0]['location']}
    if (req.files['audio']) { res.audioPath = req.files['audio'][0]['location']}
    res.save(function(err){
      if (err) throw err
    })
  })
}

module.exports.createNewChat = function(req, res){
  var newChat = Chat()
  newChat.participants.push(req.body.id)
  newChat.participants.push(req.user)
  newChat.sender = req.body.name
  newChat.recipient = req.user.name
  newChat.save(function(err){
    if (err) throw err;
    res.redirect(`/chats/${newChat._id}`);
  })
}
