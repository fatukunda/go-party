"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _app = _interopRequireDefault(require("../app"));

var _testData = require("./testData");

/* eslint-disable no-undef */
var usersUrl = '/api/v1/users';

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the user endpoints:', function () {
  it('should create a user', function (done) {
    var username = _testData.validUser.username,
        email = _testData.validUser.email;

    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.validUser).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data.user).to.include({
        id: 1,
        username: username,
        email: email
      });
      done();
    });
  });
  it('Should not create a user with incomplete required fields', function (done) {
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.invalidUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
<<<<<<< HEAD:build/tests/user.test.js
  it('Should throw an error is something wrong happens while creating a user', function (done) {
=======
  it('Should throw an error if something wrong happens while creating a user', function (done) {
>>>>>>> ft(Create a party): User creates a party:build/tests/a.user.test.js
    // In this test case, we are trying to create a user with an invalid email address.
    _chai["default"].request(_app["default"]).post(usersUrl).set('Accept', 'application/json').send(_testData.invalidDataUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('Should not login an unverified account', function (done) {
    var username = _testData.validUser.username,
        password = _testData.validUser.password;

    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send({
      username: username,
      password: password
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Please verify your account.');
      done();
    });
  });
  it('Should verify an account', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: _testData.validUser.id
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/confirmation/").concat(token)).set('Accept', 'application/json').send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Account activated successfully!');
      done();
    });
  });
  it('Should throw an error if something happens while verifying an account', function (done) {
    // In this test case we are trying to use a wrong JWT_KEY than the one that was used to create the Token.
    var token = _jsonwebtoken["default"].sign({
<<<<<<< HEAD:build/tests/user.test.js
      id: 1
=======
      id: _testData.validUser.id
>>>>>>> ft(Create a party): User creates a party:build/tests/a.user.test.js
    }, 'wrong_jwt_key', {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/confirmation/").concat(token)).set('Accept', 'application/json').send().end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('Should login an with a verified account', function (done) {
    var username = _testData.validUser.username,
        password = _testData.validUser.password;

    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send({
      username: username,
      password: password
    }).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Logged in successfully!');
      done();
    });
  });
  it('Should throw an error if username and password are not provided', function (done) {
    _chai["default"].request(_app["default"]).post("".concat(usersUrl, "/login")).set('Accept', 'application/json').send().end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should not upload avatar by unauthorized user', function (done) {
    _chai["default"].request(_app["default"]).put("".concat(usersUrl, "/avatar")).attach('image', _fs["default"].readFileSync('src/tests/fixtures/andela2.jpg'), 'andela2.png').end(function (err, res) {
      expect(res.status).to.equal(401);
      expect(res.body.error).to.equal('Not authorized to access this resource');
      done();
    });
  });
  it('should upload avatar by authorized user', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).put("".concat(usersUrl, "/avatar")).set('Authorization', "Bearer ".concat(token)).attach('image', _fs["default"].readFileSync('src/tests/fixtures/andela2.jpg'), 'andela2.png').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Avatar Uploaded successfully!');
      done();
    });
  });
  it('should fetch current user profile', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/me")).set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('success');
      done();
    });
  });
  it('should not edit user with invalid attribute names', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    var newUserDetails = {
      bio: 'This is a test bio',
      school: 'This attribute should not be there.'
    };

    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/profile/edit")).set('Authorization', "Bearer ".concat(token)).send(newUserDetails).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Invalid update options!');
      done();
    });
  });
  it('should edit a user', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    var newUserDetails = {
      bio: 'This is a test bio',
      dob: '04/02/2012'
    };

    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/profile/edit")).set('Authorization', "Bearer ".concat(token)).send(newUserDetails).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('User updated successfully');
      done();
    });
  });
  it('should throw an error if something goes wrong while updating a user', function (done) {
    // In this test case, We are passing date of birth as a string so we expect an error to happen.
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    var newUserDetails = {
      bio: 'This is a test bio',
      dob: 'this is not a date'
    };

    _chai["default"].request(_app["default"]).patch("".concat(usersUrl, "/profile/edit")).set('Authorization', "Bearer ".concat(token)).send(newUserDetails).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
});
//# sourceMappingURL=a.user.test.js.map