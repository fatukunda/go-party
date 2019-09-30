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
  it('Should view details of a single party', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/1")).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Single party');
      done();
    });
  });
  it('Should throw 404 if party is not found', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/50")).send().end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Party not found');
      done();
    });
  });
  it('Should throw 400 if something wrong happens while fetching a party', function (done) {
    _chai["default"].request(_app["default"]) // Tring to pass an invalid data type of party id will throw a 400 error
    .get("".concat(partyUrl, "/invaliddata")).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
  it('Should edit a party', function (done) {
    var editData = {
      description: 'edited description',
      title: 'edited title',
      is_free: false,
      party_date: '02:10:2020'
    };

    _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/1")).set('Authorization', "Bearer ".concat(token)).send(editData).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.title).to.equal('edited title');
      done();
    });
  });
  it('Should throw a 404 when a party to edit does not exist', function (done) {
    var editData = {
      description: 'edited description',
      title: 'edited title',
      is_free: false,
      party_date: '02:10:2020'
    };

    _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/4")).set('Authorization', "Bearer ".concat(token)).send(editData).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Party not found');
      done();
    });
  });
  it('Should throw a 400 when an invalid update option is given', function (done) {
    var editData = {
      description: 'edited description',
      title: 'edited title',
      is_free: false,
      party_date: '02:10:2020',
      // address is an invalid update option. The app should therefore throw a 400 error.
      address: 'invalid update option'
    };

    _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/1")).set('Authorization', "Bearer ".concat(token)).send(editData).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('Invalid update options!');
      done();
    });
  });
  it('Should throw 400 if something wrong happens while updating a party', function (done) {
    var editData = {
      description: 'edited description',
      title: 'edited title',
      is_free: false,
      party_date: '02:10:2020'
    };

    _chai["default"].request(_app["default"]) // Trying to pass an invalid data type of party id will throw a 400 error
    .patch("".concat(partyUrl, "/invaliddata")).set('Authorization', "Bearer ".concat(token)).send(editData).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
  it('should get party guests', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/1/guests")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Party guests');
      done();
    });
  });
  it('should throw a 404 if a aparty does not exist', function (done) {
    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/4/guests")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('A party with that id does not exist.');
      done();
    });
  });
  it('should throw a 400 if something goes wrong while fetching party guests', function (done) {
    _chai["default"].request(_app["default"]) // Route expects a number but a string is provided.
    .get("".concat(partyUrl, "/invalidinput/guests")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
  it('Should delete a party', function (done) {
    _chai["default"].request(_app["default"])["delete"]("".concat(partyUrl, "/1")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Party successfully deleted!');
      done();
    });
  });
  it('Should throw a 404 when a party to delete does not exist', function (done) {
    _chai["default"].request(_app["default"])["delete"]("".concat(partyUrl, "/4")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Attempting to delete a non-existing party.');
      done();
    });
  });
  it('Should throw 400 if something wrong happens while deleting a party', function (done) {
    _chai["default"].request(_app["default"]) // Trying to pass an invalid data type of party id will throw a 400 error
    ["delete"]("".concat(partyUrl, "/invaliddata")).set('Authorization', "Bearer ".concat(token)).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
      done();
    });
  });
});
//# sourceMappingURL=party.test.js.map