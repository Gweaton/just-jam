require('../env.js')

const User = require('../models/user')

var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    dirname: '/',
    bucket: process.env.AWS_BUCKET,
    region:  process.env.AWS_REGION,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
});

//get all users
router.get('/', function(req, res, next) {
  let query = User.find({});
  query.exec(function(err, users) {
    if (err) return console.log(err)
    res.render('users/index', {users: users})
  })
});

//new user session
router.get('/login', function(req, res, next) {
  res.render('login', { message: req.flash('loginMessage') });
});

//create user session
router.post('/login', urlencodedParser, passport.authenticate('local-login', {
  successRedirect: 'profile',
  failureRedirect: 'login',
  failureFlash: true,
}));

//new user registration
router.get('/signup', function(req, res) {
  res.render('signup', { message: req.flash('signupMessage') });
});

//account profile - not RESTFUL??
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', { user: req.user });
});

//end user session
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', urlencodedParser, passport.authenticate('local-signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true,
}));

router.post('/', upload.single('image'), function(req, res) {
  var newUser = User(req.body)
  newUser.imagePath = req.file.location
  newUser.save(function(err) {
    if (err) throw err;
    res.redirect('users/');
  });
});

router.get('/new', function(req, res) {
  res.render('users/new');
});

router.get('/:username', function(req, res) {
  User.findOne({'username': req.params.username}, function(err, user) {
    res.render('users/show', { user: user });
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
