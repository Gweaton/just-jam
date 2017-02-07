process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var Jammer = require('../../models/jammer');
var mongoose = require('mongoose')
var helper = require('./testHelper');


Browser.localhost('localhost', 3001);

describe('things', function() {

  const browser = new Browser();

  beforeEach(function() {
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    mongoose.model('Jammer').create({name: "Zombie"});
    return browser.visit('jammers/')
  });

  describe('Viewing other jammers', function() {

    it('should show all the signed up jammers', function() {
      browser.assert.text('h1', 'Jammers');
      browser.assert.text('h2', 'Zombie');
    })

  });

  describe('Viewing a single jammer', function() {

    it('should show a single jammer', function() {
      return browser.clickLink('Show')
        .then(function(){
          browser.assert.text('h1', 'Zombie');
        })
    })

  });

});
