process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert')
var expect = require('chai').expect

Browser.localhost('localhost', 3001)

describe('Profile creation page', function() {
  const browser = new Browser();

  before(function(done) {
    browser.visit('/users/new', done)
    console.log('browser.location.href')
  });

  it('should show a form', function() {
    expect(browser).to.have.status(200);
    assert.equal(browser.text('h1'), "Enter your details to start jammin'");
  });

  describe('submits form', function() {
    before(function(done) {
      browser
      .fill('name', 'Prince')
      .fill('username', 'Princy')
      .fill('email', 'prince@gmail.com')
      .fill('location', 'Somewhere else')
      .fill('genres', 'Loads')
      .fill('instruments', 'Loads')
      .fill('bio', 'he was great');
      browser.pressButton("Get Jammin'", done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should take you to the index page', function() {
      browser.assert.text('h1', 'Jammers...')
    });
  });
});
