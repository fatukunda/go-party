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
  it('Should varify an account', function (done) {
    var token = _jsonwebtoken["default"].sign({
      id: 1
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).get("".concat(usersUrl, "/confirmation/").concat(token)).set('Accept', 'application/json').send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Account activated successfully!');
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
});
//# sourceMappingURL=user.test.js.map