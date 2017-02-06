var expect = require('chai').expect;

var Jammer = require('../models/jammer');

describe('jammer', function() {
    it('should be invalid if name is empty', function(done) {
        var jammer = new Jammer();

        jammer.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});
