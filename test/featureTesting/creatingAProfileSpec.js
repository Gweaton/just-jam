process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var helper = require('./testHelper');

Browser.localhost('localhost', 3001);

describe('Visiting the website', function() {

  User.collection.drop();

  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done)
  });

  it('should show a welcome page', function() {
    browser.assert.success();
    browser.assert.text('p', "Find your musical soulmates.");
  });

  describe('signs up', function() {
    before(function(done) {
      browser.visit('/users/signup', done)
    });

    it('should show the sign up form', function() {
      browser.assert.element('form');
    });

    before(function(done) {
      helper.signUp(browser);
      browser.pressButton('Submit', done)
    });

    it('should take you to the make a profile page', function() {
      browser.assert.text('h1', "Enter your details to start jammin'!")
    });

    describe('Making a profile', function() {
      before(function(done) {
        helper.createProfile(browser);
        browser.pressButton("Get Jammin'", done);
      });

      it('filling in your details should take you to your profile', function() {
        browser.assert.text('h1', 'Prince')
        browser.assert.attribute('img', 'img-custom img-responsive')
      });
    });
  });
});
