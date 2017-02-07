process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');

var assert = require('assert');
var User = require('../../models/user');
var Jammer = require('../../models/jammer');
var mongoose = require('mongoose')
var helper = require('./testHelper');


Browser.localhost('localhost', 3001);

describe('Seeing all jammers', function() {

  const browser = new Browser();

  beforeEach(function() {
    console.log(1)
    mongoose.model('Jammer').remove({}, function(err) {
      if (err) throw err;
    });
    mongoose.model('Jammer').create({name: "Zombie"});
        console.log(2)
    return browser.visit('jammers/')
        console.log(3)
  });

  describe('Viewing other jammers', function() {

    it('should show all the signed up jammers', function() {
          console.log(4)
      browser.assert.text('h1', 'Jammers');
      browser.assert.text('h2', 'Zombie');
          console.log(5)
    })

  });

  describe('Viewing a single jammer', function() {

    it('should show a single jammer', function() {
          console.log(6)
      return browser.clickLink('Show')
        .then(function(){
              console.log(7)
          browser.assert.text('h1', 'Zombie');
              console.log(8)
        })
    })

  });

});
