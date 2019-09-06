"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

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
});
//# sourceMappingURL=user.test.js.map