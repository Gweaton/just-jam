process.env.NODE_ENV = 'test';

var app = require('../../app');
var assert = require('assert');
var Browser = require('zombie');
var User = require('../../models/user');
var mongoose = require('mongoose');


Browser.localhost('localhost', 3001);

describe('Viewing Jammers', function() {

  const browser = new Browser();

  beforeEach(function() {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    mongoose.model('Jammer').create({name: "Zombie"});
    return browser.visit('jammers/');
  });

  it('jammers index should show all the signed up jammers', function() {
    browser.assert.text('h1', 'Jammers');
    browser.assert.text('h2', 'Zombie');
  });

  it('clicking a Jammer should go to their profile page', function() {
      return browser.clickLink('Show')
        .then(function(){
          browser.assert.text('h1', 'Zombie');
        });
  });

});
