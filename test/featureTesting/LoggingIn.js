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

  before(function(done) {
    mongoose.model('User').remove({}, function(err) {
      if (err) throw err;
    });
    browser.visit('users/signup', done)
  });

  describe('logging out', function() {
    //
    before(function(done) {
      browser
      .fill('email', 'test@test.com')
      .fill('password', 'testpassword')
      .pressButton('Submit', function() {
        browser.clickLink('Log Out', done)
      });
    })

    it('should go to index page', function() {
      browser.assert.text('p', "Find your musical soulmates.")
    })

    describe('logging in', function() {

      before(function(done) {
        browser.clickLink('Log in', function() {
          browser
          .fill('email', 'test@test.com')
          .fill('password', 'testpassword')
          .pressButton('Submit', done)
        })
      })

      it('should be able to login', function() {
        browser.assert.text('h1', 'Jammers')
      })

    })

  });

});
