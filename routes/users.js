var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = User.find({});
  query.exec(function(err, users) {
    if (err) return console.log(err)
    res.render('users/index', {users: users})
  })
});

router.post('/', function(req, res) {
  var newUser = User(req.body);
  newUser.save(function(err) {
    if (err) throw err;
    res.redirect('users/');
  });
});

router.get('/new', function(req, res) {
  res.render('users/new');
});


module.exports = router;
