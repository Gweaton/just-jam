process.env.NODE_ENV = 'test';

var app = require('../../app');
var assert = require('assert');
var Browser = require('zombie');
var User = require('../../models/user');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3001);

describe('Sessions', function() {

  const browser = new Browser();

  before(function() {
    mongoose.model('User').remove({}, function(err) {
      if (err) throw err;
    });

    return browser.visit('/users/signup')
      .then(function() {
        browser
          .fill('email', 'test@test.com')
          .fill('password', 'testpassword')
          return browser.pressButton('Submit');
      });
  });

  it('logging out returns to the index page', function() {
      return browser.clickLink('Log Out')
        .then(function() {
          browser.assert.text('p', "Find your musical soulmates.");
        });
  });

  it('logging in takes user to Jammers page', function() {
    return browser.clickLink('Log in')
     .then(function() {
       return browser
          .fill('email', 'test@test.com')
          .fill('password', 'testpassword');
          return pressButton('Submit')
            .then(function() {
              browser.assert.text('h1', 'Jammers');
          });
      });
  });
});
