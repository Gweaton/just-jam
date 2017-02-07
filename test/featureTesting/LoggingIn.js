process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var mongoose = require('mongoose')
var User = require('../../models/user');
var helper = require('./testHelper');

Browser.localhost('localhost', 3001);


describe('Sessions', function() {

  const browser = new Browser();

  before(function() {
    mongoose.model('User').remove({}, function(err) {
      if (err) throw err;
    });
    return browser.visit('users/signup')
  });

  describe('logging out', function() {

    before(function() {
      return browser
        .fill('email', 'test@test.com')
        .fill('password', 'testpassword')
        .pressButton('Submit')
          .then(function() {
            return browser.clickLink('Log Out')
          });
    });

    it('should go to index page', function() {
      browser.assert.text('p', "Find your musical soulmates.")
    })

  });

  describe('logging in', function() {

    before(function() {
      return browser.clickLink('Log in')
        .then(function() {
          return browser
            .fill('email', 'test@test.com')
            .fill('password', 'testpassword')
            .pressButton('Submit')
        })
    })

    it('should take user to Jammers page', function() {
      browser.assert.text('h1', 'Jammers')
    })

  })


});
