process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var Jammer = require('../../models/jammer');
var mongoose = require('mongoose')
var helper = require('./testHelper');


Browser.localhost('localhost', 3001);

describe('Creating a profile', function() {

  const browser = new Browser();

  before(function() {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    return browser.visit('users/signup')
  });

  it('should show all the signed up jammers', function() {
    browser
      .fill('email', 'zombie@zombie.com')
      .fill('password', 'zombiez')
      return browser.pressButton('Submit')
        .then(function() {
          browser
            .fill('name', 'Prince')
            return browser.pressButton("Get Jammin'")
              .then(function() {
                browser.assert.text('h1', 'Prince')
              })
        })
  })

});
