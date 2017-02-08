var methods = require('../methods.js')
const User = require('../models/user')
const Jammer = require('../models/jammer')

var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get(`/`, function(req, res, next) {
  res.redirect('/jammers');
});

//new user session
router.get('/login', function(req, res, next) {
  res.render('users/login', { message: req.flash('loginMessage') });
});

//create user session
router.post('/login', urlencodedParser, passport.authenticate('local-login', {
  successRedirect: '/jammers',
  failureRedirect: 'login',
  failureFlash: true,
}));

//new user registration
router.get('/signup', function(req, res) {
  res.render('users/signup', { message: req.flash('signupMessage') });
});

router.get('/profile', methods.isLoggedIn, function(req, res) {
  Jammer.findOne({'_id': req.user.jammer}, function(err, jammer) {
    if (err) throw err
    res.render('users/profile', { user: req.user, jammer: jammer})
  });
});

//end user session - change to DELETE?
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// create new user
router.post('/', urlencodedParser, passport.authenticate('local-signup', {
  successRedirect: 'jammers/new',
  failureRedirect: 'users/signup',
  failureFlash: true,
}));

module.exports = router;
