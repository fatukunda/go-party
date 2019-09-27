"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _testData = require("./testData");

/* eslint-disable no-undef */
var partyUrl = '/api/v1/parties';
var usersUrl = '/api/v1/users';

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the party requests endpoints', function () {
  var token = _jsonwebtoken["default"].sign({
    id: _testData.validUser.id
  }, process.env.JWT_KEY, {
    expiresIn: '1h'
  });

  it('Should send a party request', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _testData.populateUser)();

          case 2:
            _context.next = 4;
            return (0, _testData.populateParty)();

          case 4:
            _context.next = 6;
            return (0, _testData.populateInitialParty)();

          case 6:
            _context.next = 8;
            return _chai["default"].request(_app["default"]).post("".concat(partyUrl, "/2/requests")).set('Authorization', "Bearer ".concat(token)).send(_testData.validRequest);

          case 8:
            res = _context.sent;
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Request successfully sent');
            expect(res.body.data.status).to.equal('pending');

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))));
  it('Should throw a 404 if the party does not exist', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _chai["default"].request(_app["default"]).post("".concat(partyUrl, "/4/requests")).set('Authorization', "Bearer ".concat(token)).send(_testData.validRequest);

          case 2:
            res = _context2.sent;
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('The party you are requesting to attend does not exist.');

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))));
  it('Should throw a 400 when a user requests to attend their own party', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _chai["default"].request(_app["default"]).post("".concat(partyUrl, "/1/requests")).set('Authorization', "Bearer ".concat(token)).send(_testData.validRequest);

          case 2:
            res = _context3.sent;
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('You cannot request to attend your own party.');

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))));
  it('Should throw a 400 when a user requests to attend a party that they have already requested to attend', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    var res;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _chai["default"].request(_app["default"]).post("".concat(partyUrl, "/2/requests")).set('Authorization', "Bearer ".concat(token)).send(_testData.validRequest);

          case 2:
            res = _context4.sent;
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('You have already requested to attend this party.');

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }))));
  it('Should throw a 400 when something wrong happens trying to send a party request', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _chai["default"].request(_app["default"]) // The url expects an integer but a string is provided
            .post("".concat(partyUrl, "/invaliddata/requests")).set('Authorization', "Bearer ".concat(token)).send(_testData.validRequest);

          case 2:
            res = _context5.sent;
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('error');

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }))));
  it('Should get party requests', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var res;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/1/requests")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context6.sent;
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Party requests');

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }))));
  it('Should throw a 404 if a party to fetch requests from is not found', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var res;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/5/requests")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context7.sent;
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Party does not exist.');

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }))));
  it('Should throw a 400 if a user tries to fetch requests for a party they did not create.', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    var localToken, res;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            localToken = _jsonwebtoken["default"].sign({
              id: 2
            }, process.env.JWT_KEY, {
              expiresIn: '1h'
            });
            _context8.next = 3;
            return _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/1/requests")).set('Authorization', "Bearer ".concat(localToken)).send();

          case 3:
            res = _context8.sent;
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('You can only view requests for parties you created.');

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }))));
  it('Should throw a 400 if anything goes wrong while fetching party requests.', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    var res;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _chai["default"].request(_app["default"]) // The url expects an integer but a string is provided
            .get("".concat(partyUrl, "/invalidInput/requests")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context9.sent;
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('error');

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }))));
  it('Should accept a party request', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    var res;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/1/requests/1/accepted")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context10.sent;
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Party request altered.');

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }))));
  it('Should throw a 404 if the party with the request does not exist', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11() {
    var res;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/100/requests/1/accepted")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context11.sent;
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Party with that request does not exist.');

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }))));
  it('Should throw a 400 if a user tries to alter a request to a party they did not create', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12() {
    var localToken, res;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            localToken = _jsonwebtoken["default"].sign({
              id: 2
            }, process.env.JWT_KEY, {
              expiresIn: '1h'
            });
            _context12.next = 3;
            return _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/1/requests/1/accepted")).set('Authorization', "Bearer ".concat(localToken)).send();

          case 3:
            res = _context12.sent;
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('You cannot alter a request for a party you did not create.');

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }))));
  it('Should throw a 404 if a request being altered does not exist.', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13() {
    var res;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _chai["default"].request(_app["default"]).patch("".concat(partyUrl, "/1/requests/2/accepted")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context13.sent;
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('The request you are trying to alter does not exist.');

          case 5:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }))));
  it('Should throw a 400 if something wrong happens while altering a request.', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14() {
    var res;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _chai["default"].request(_app["default"]) // We are passing a parameter `notallowed` that our route database does not expect
            .patch("".concat(partyUrl, "/1/requests/1/notallowed")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context14.sent;
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('error');

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }))));
  it('should throw a 400 if a user tries to get guests to a party they did not create', function (done) {
    var localToken = _jsonwebtoken["default"].sign({
      id: 2
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });

    _chai["default"].request(_app["default"]).get("".concat(partyUrl, "/1/guests")).set('Authorization', "Bearer ".concat(localToken)).send().end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('You can only view requests for a party you created.');
      done();
    });
  });
  it('Should successfully withdraw a party request', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15() {
    var res;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _chai["default"].request(_app["default"])["delete"]("".concat(usersUrl, "/me/requests/1")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context15.sent;
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Party request successfully withdrawn');

          case 5:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }))));
  it('Should throw a 404 if a request does not exist.', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16() {
    var res;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _chai["default"].request(_app["default"])["delete"]("".concat(usersUrl, "/me/requests/4")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context16.sent;
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('That party request does not exist.');

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }))));
  it('Should throw a 400 when something goes wrong trying to withdraw a party request', (0, _testData.mochAsync)(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17() {
    var res;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _chai["default"].request(_app["default"]) // The url expects an integer for request id but a string is provided
            ["delete"]("".concat(usersUrl, "/me/requests/invalidrequestid")).set('Authorization', "Bearer ".concat(token)).send();

          case 2:
            res = _context17.sent;
            expect(res.status).to.equal(400);
            expect(res.body.status).to.equal('error');

          case 5:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }))));
});
//# sourceMappingURL=request.test.js.map