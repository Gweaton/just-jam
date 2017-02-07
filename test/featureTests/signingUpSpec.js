process.env.NODE_ENV = 'test';

var app = require('../../app');
var assert = require('assert');
var Browser = require('zombie');
var User = require('../../models/user');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3001);

describe('Signing up', function() {

  describe('when user is a new user', function() {

    const browser = new Browser();

    before(function() {
      mongoose.model('User').remove({}, function(err) {
        if (err) throw err;
      });
      return browser.visit('users/signup')
        .then(function() {
          browser
            .fill('email', 'zombie@zombie.com')
            .fill('password', 'zombiez')
          return browser.pressButton('Submit');
        })
    });

    it('new user can sign up and is taken to create profile page', function() {
      User.find({}, function(err, docs) {
        docs.length.should.equal(1)
      })
    });

    it('after sign up user is taken to create profile page', function() {
      browser.assert.text('h1', "Enter your details to start jammin'!")
      browser.assert.element('#jammer-form');
    });

  });

  describe('when user is already signed up', function() {

    const browser = new Browser()

    before(function() {
      mongoose.model('User').remove({}, function(err) {
        if (err) throw err;
      });
      mongoose.model('User').create({"local.email" : "test@test.com", "local.password" :  "testpassword"});
      return browser.visit('users/signup')
        .then(function() {
          browser
            .fill('email', 'test@test.com')
            .fill('password', 'testpassword')
          return browser.pressButton('Submit');
        })
    });

    it('should not add a new user', function() {
      User.find({}, function(err, docs) {
        docs.length.should.equal(1)
      })
    });

    it('should raise an error', function() {
      browser.assert.text('.alert', "That email is already in use.")
    });

    it('should return to the sign up form', function() {
      browser.assert.text('h1', "Sign Up")
    });

  });

});
