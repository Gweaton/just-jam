process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var mongoose = require('mongoose')
var User = require('../../models/user');
var helper = require('./testHelper');

Browser.localhost('localhost', 3001);

describe('Signing up', function() {


  const browser = new Browser();

  before(function(done) {
    mongoose.model('User').remove({}, function(err) {
      if (err) throw err;
    });
    browser.visit('users/signup', done)
  });

  describe('submits form', function() {
    before(function(done) {
      browser
        .fill('email', 'zombie@zombie.com')
        .fill('password', 'zombiez')
        .pressButton('Submit', done);
    })
    it('should be successful', function() {
      browser.assert.success();
    });
    it('should show create a profile page', function() {
      browser.assert.text('h1', "Enter your details to start jammin'!")
      browser.assert.element('#jammer-form');
    });
  });
});
