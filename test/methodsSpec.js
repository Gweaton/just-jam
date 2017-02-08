var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var Jammer = require('../models/jammer');
var User = require('../models/user')
var methods = require('../methods')
var mongoose = require('mongoose');

var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

describe('Methods', function() {

  before(function() {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    mongoose.model('User').remove({}, function(err){
      if (err) throw err;
    })
  });
    // it('should be able to check if someone is logged in', function(done){
    //   var req = sinon.mock(User)
    //   var res = {}
    //   var spy = res.redirect = sinon.spy()
    //   methods.isLoggedIn(req, res)
    //   expect(spy.calledOnce).to.equal(true)
    //   done()
    // })

  it('should be able to create a new Jammer', function(done){
    var userStub = sinon.mock(User)
    var req = { body: { name: "Test"}, files: {}, user: userStub }
    var result = methods.createNewJammer(req)
    expect(result).to.have.property('addedBy')
    done()
  })

  it('should be able to assign Jammer to User', function(done){
    var userStub = User({name: "Test"})
    var jammerStub = sinon.mock(Jammer)
    var req = { user: userStub, body: { name: "test"} }
    var spy = sinon.spy(userStub, 'save')
    methods.assignJammerToUser(req, jammerStub)
    expect(spy.calledOnce).to.equal(true)
    done()
  })

  it('should be able to update Jammer', function(done){
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    var testJammer = Jammer({ name: "Test", '_id': 100 })
    var req = { body: { name: "Replacement"}, params: { id: 100 } }
    methods.updateJammer(req)
    expect(testJammer.name).to.equal("Replacement")
    done()
  })

  // it('')
});
