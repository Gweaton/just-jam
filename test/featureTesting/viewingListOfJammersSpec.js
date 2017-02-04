process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var helper = require('./testHelper');


Browser.localhost('localhost', 3001);

describe('Viewing other jammers', function() {
  User.collection.drop();

  const browser = new Browser();

  before(function(done) {
    browser.visit('/jammers/', done);
  });

  it('should show all the signed up jammers', function() {
    browser.assert.text('h1', 'Jammers');
  });
});
