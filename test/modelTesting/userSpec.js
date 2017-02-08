require('sinon-mongoose')
var sinon = require('sinon')
var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
var expect = chai.expect
var mongoose = require('mongoose')
var server = require('../../app')

chai.use(chaiHttp)

var User = require('../../models/user')

describe("Get all users", function(){

  it('should get all users', function(done){
    var UserMock = sinon.mock(User)
    var expectedResult = { status: true, user: []}
    UserMock.expects('find').yields(null, expectedResult)

    User.find(function(err, result){
      UserMock.verify()
      UserMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })

  it('should return error if no users', function(done){
    var UserMock = sinon.mock(User)
    var expectedResult = { status: false, error: "Something went wrong"}
    UserMock.expects('find').yields(expectedResult, null)

    User.find(function(err, result){
      UserMock.verify()
      UserMock.restore()
      expect(err.status).to.not.be.true
      done()
    })
  })

})

describe("Post a new user", function(){

  it('should save a new user', function(done){
    var UserMock = sinon.mock(new User( {name: 'test', bio:'test user'} ))
    var user = UserMock.object
    var expectedResult = { status: true }
    UserMock.expects('save').yields(null, expectedResult)

    user.save(function(err, result){
      UserMock.verify()
      UserMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })

  it('should return error if user is not saved', function(done){
    var UserMock = sinon.mock(new User( {name: 'test', bio:'test user'} ))
    var user = UserMock.object
    var expectedResult = { status: false }
    UserMock.expects('save').yields(expectedResult, null)

    user.save(function(err, result){
      UserMock.verify()
      UserMock.restore()
      expect(err.status).to.not.be.true
      done()
    })
  })
})
