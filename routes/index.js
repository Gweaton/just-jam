var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/login', function(req, res, next) {
//   // console.log(req.flash('loginMessage'))
//   res.render('login', { message: req.flash('loginMessage') });
// });

// router.get('/signup', function(req, res) {
//   // console.log(req.flash('signupMessage'))
//   res.render('signup', { message: req.flash('signupMessage') });
// });
//
// router.get('/profile', isLoggedIn, function(req, res) {
//   res.render('profile', { user: req.user });
// });
//
// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });
//
// router.post('/signup', urlencodedParser, passport.authenticate('local-signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/signup',
//   failureFlash: true,
// }));

// router.post('/login', urlencodedParser, passport.authenticate('local-login', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true,
// }));

module.exports = router;

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/');
// }
