var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = User.find({});
  query.exec(function(err, users) {
    if (err) return console.log(err)
    // res.render('users/index.ejs', {users: users})
    res.send('respond with a resource');
  })
});


module.exports = router;
