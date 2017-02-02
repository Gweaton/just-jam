process.env.NODE_ENV = 'test';

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');

var assert = require('assert')

describe('Profile creation page', function() {

  function fillInForm(browser) {
    browser
    .fill('name', 'Prince')
    .fill('username', 'Princy')
    .fill('email', 'prince.com')
    .fill('location', 'Somewhere else')
    .fill('genres', 'Loads')
    .fill('instruments', 'Loads')
    .fill('bio', 'he was great')
    .pressButton("Get Jammin'");
  }

  before(function() {
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser( {site: 'http://localhost:3000'} )
  });

  beforeEach(function(done) {
    this.browser.visit('/users/new', done)
  });

  it('should show a form', function() {
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), "Enter your details to start jammin'");
  });

  it('should allow the form to be filled in', function(done) {
    var browser = this.browser;
    browser
    fillInForm(browser);
    done();
    assert.ok(browser.success);
    assert.equal(this.browser.text('li'), "Prince");
  });

  after(function(done) {
    this.server.close(done);
  });
});
