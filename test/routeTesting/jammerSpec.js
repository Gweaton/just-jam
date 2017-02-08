//testing that .get .post etc. do the right thing

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Jammer = require('../../models/jammer');
let sinon = require('sinon')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();
var methods = require('../../methods')

chai.use(chaiHttp)

describe('Jammer Routes', () => {

  beforeEach((done) => {
    Jammer.remove({}, (err) => {
       done();
    });
  });

  describe('/POST jammer', () => {
      it('it should redirect after POSTing a jammer', (done) => {
        var req, res, spy
        req = res = {};
        spy = res.redirect = sinon.spy();

        chai.request(app)
          .post('/jammers')
          done();
        chai.expect(spy.calledOnce).to.equal(true)

      });
  });
});
