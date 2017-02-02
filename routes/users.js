require('../env.js')

const express = require('express');
const router = express.Router();
const User = require('../models/user')

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = User.find({});
  query.exec(function(err, users) {
    if (err) return console.log(err)
    var currentUser = req.user
    res.render('users/index', {users: users, currentUser})
  })
});

router.post('/', upload.single('image'), function(req, res) {
  var newUser = User(req.body)
  newUser.imagePath = req.file.location
  newUser.save(function(err) {
    if (err) throw err;
    res.redirect('users/');
  });
});

router.get('/new', function(req, res) {
  var currentUser = req.user
  res.render('users/new', { user: currentUser });
});

router.get('/:username', function(req, res) {
  User.findOne({'username': req.params.username}, function(err, user) {
    var currentUser = req.user
    res.render('users/show', { user: user, currentUser });
  });
});


module.exports = router;
//
// function currentUser(req, res){
//   if (req.user){
//     return true
//   }
// }

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
