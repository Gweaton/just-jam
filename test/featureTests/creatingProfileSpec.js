process.env.NODE_ENV = 'test';

var app = require('../../app');
var assert = require('assert');
var Browser = require('zombie');
var Jammer = require('../../models/jammer');
var mongoose = require('mongoose');

Browser.localhost('localhost', 3001);

describe('Adding a Jammer profile', function() {

  const browser = new Browser();

  before(function() {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });

    return browser.visit('users/signup')
      .then(function() {
        browser
          .fill('email', 'prince@prince.com')
          .fill('password', 'prince123')
          return browser.pressButton('Submit')
            .then(function() {
              browser
                .fill('name', 'Prince')
                return browser.pressButton("Get Jammin'")
            })
      });
  });

  it('should take the user to their profile page', function() {
      browser.assert.text('h1', 'Prince')
  });

  it('should create a new Jammer profile', function() {
    Jammer.find({}, function(err, docs) {
      docs.length.should.equal(1)
    })
  });

});
