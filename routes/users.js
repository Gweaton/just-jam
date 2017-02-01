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

router.get('/new', function(req, res) {
  res.render('users/new');
})

router.get('/:username', function(req, res) {
  User.findOne({'username': req.params.username}, function(err, user) {
    console.log(user)
    res.render('users/show', { user: user });
  });
});


module.exports = router;
