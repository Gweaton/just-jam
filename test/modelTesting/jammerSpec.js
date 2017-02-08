var expect = require('chai').expect;
var sinon = require('sinon');
var chai = require('chai');
var Jammer = require('../../models/jammer');
var methods = require('../../methods')


describe('Jammer', function() {
    it('should be invalid if name is empty', function(done) {
      var jammer = new Jammer();
      jammer.validate(function(err) {
          expect(err.errors.name).to.exist;
          done();
      });
    });

    it('should be able to create a new Jammer', function(done){
      var req = { body: { name: "Test" }, files: {}, user: "test" }
      createNewJammer(req)
      expect(testJammer).to.have.property('addedBy')
      done()
    })
});
