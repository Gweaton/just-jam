
var methods = require('../methods.js')

const User = require('../models/user')
const Jammer = require('../models/jammer')

var express = require('express');
var passport = require('passport');
var router = express.Router();

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
  }),
  limits: { fileSize: 2000000 }
});

router.get('/new', methods.isLoggedIn, function(req, res) {
  if (!req.user){
    res.redirect('/')
  } else if (req.user.jammer) {
    res.redirect('/users/profile')
  } else {
    res.render('jammers/new', {user: req.user});
  }
});

router.post('/', upload.fields([{name: 'image'}, {name: 'audio'}]), function(req, res) {
  newJammer = methods.createNewJammer(req)
  methods.assignJammerToUser(req, newJammer)
  res.redirect(`jammers/${newJammer._id}`);
});


router.get('/', function(req, res, next) {
  let query = Jammer.find(req.query).where('addedBy').ne(req.user);
  query.exec(function(err, jammers) {
    if (err) return console.log(err)
    res.render('jammers/index', {jammers: jammers})
  })
});

router.get('/:id', function(req, res) {
  Jammer.findOne({'_id': req.params.id}, function(err, jammer) {
    res.render('jammers/show', { jammer: jammer });
  });
});

router.get('/edit/:id', function(req, res){
  Jammer.findOne({ '_id': req.params.id}, function(err, jammer){
    if (err) throw err;
    res.render('jammers/edit', { jammer: jammer })
  })
})

router.post('/update/:id', upload.fields([{name: 'image'}, {name: 'audio'}]), function(req, res){
  methods.updateJammer(req)
  res.redirect('/users/profile')
})


module.exports = router;
