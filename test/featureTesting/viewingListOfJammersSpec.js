process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var Jammer = require('../../models/jammer');
var mongoose = require('mongoose')
var helper = require('./testHelper');


Browser.localhost('localhost', 3001);

describe('Viewing other jammers', function() {

  const browser = new Browser();

  before(function(done) {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    mongoose.model('Jammer').create({name: "Zombie"});
    browser.visit('/jammers', done);
  });

  it('should show all the signed up jammers', function() {
    browser.assert.text('h1', 'Jammers');
    browser.assert.text('h2', 'Zombie');
  });
});
