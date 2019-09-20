"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _testData = require("./testData");

/* eslint-disable no-undef */
var partyUrl = '/api/v1/parties';

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the party endpoints', function () {
  var token = _jsonwebtoken["default"].sign({
    id: _testData.validUser.id
  }, process.env.JWT_KEY, {
    expiresIn: '1h'
  });

  it('should create a party', function (done) {
    _chai["default"].request(_app["default"]).post(partyUrl).set('Authorization', "Bearer ".concat(token)).send(_testData.validParty).end(function (err, res) {
      expect(res.status).to.equal(201);
    });

    done();
  });
  it('Should not create a party with incomplete required fields', function (done) {
    _chai["default"].request(_app["default"]).post(partyUrl).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidParty).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
  it('Should throw an error if something wrong happens while creating a party', function (done) {
    // In this test case, we are trying to create a party with an invalid title.
    _chai["default"].request(_app["default"]).post(partyUrl).set('Authorization', "Bearer ".concat(token)).send(_testData.invalidDataParty).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('Should fetch parties for a given user', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/createdby/1")).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.count).to.equal(1);
      done();
    });
  });
  it('Should throw an error when something goes wrong while fetching user parties', function (done) {
    _chai["default"].request(_app["default"]) //In this test case, we are trying to provide a string as a parameter but am integer is expected. Therefore, an error will be thrown and our test will pass.
    .get("".concat(partyUrl, "/createdby/invalidstringinput")).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
});
//# sourceMappingURL=party.test.js.map