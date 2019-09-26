"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateInitialParty = exports.mochAsync = exports.validRequest = exports.destroyParty = exports.populateParty = exports.destroyUser = exports.populateUser = exports.invalidDataParty = exports.invalidParty = exports.validParty = exports.invalidDataUser = exports.invalidUser = exports.validUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var validUser = {
  id: 1,
  username: 'testUser',
  password: 'testPassword',
  email: 'test@app.com'
};
exports.validUser = validUser;
var invalidUser = {
  username: 'testUser',
  password: 'testPass'
};
exports.invalidUser = invalidUser;
var testUser1 = {
  id: 2,
  username: 'testuser1',
  password: 'testuserpass1',
  email: 'testuser@app.com'
};
var testParty1 = {
  id: 2,
  title: 'Test party 1',
  description: 'This is a test party 1',
  location: 'test location 1',
  party_date: '02.02.2020',
  party_type: 'house party 1',
  host_id: testUser1.id
};
var invalidDataUser = {
  username: 12345,
  password: 'testPassword',
  email: 'app.com'
};
exports.invalidDataUser = invalidDataUser;
var validParty = {
  id: 1,
  title: 'Test party',
  description: 'This is a test party',
  location: 'test location',
  party_date: '02.02.2020',
  party_type: 'house party',
  host_id: validUser.id
};
exports.validParty = validParty;
var invalidParty = {
  title: 'Test party',
  description: 'This is a test party',
  location: 'test location'
};
exports.invalidParty = invalidParty;
var invalidDataParty = {
  title: 5635363,
  description: 'This is a test party',
  location: 'test location',
  party_date: '02.02.2020',
  party_type: 'house party',
  host_id: validUser.id
};
exports.invalidDataParty = invalidDataParty;
var validRequest = {
  id: 1,
  guest_id: testUser1.id,
  party_id: testParty1.id
};
exports.validRequest = validRequest;

var destroyUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models["default"].User.destroy({
              where: {
                id: 2
              }
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function destroyUser() {
    return _ref.apply(this, arguments);
  };
}();

exports.destroyUser = destroyUser;

var destroyParty =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models["default"].Party.destroy({
              where: {
                id: 2
              }
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function destroyParty() {
    return _ref2.apply(this, arguments);
  };
}();

exports.destroyParty = destroyParty;

var populateParty =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models["default"].Party.create(testParty1);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function populateParty() {
    return _ref3.apply(this, arguments);
  };
}();

exports.populateParty = populateParty;

var populateInitialParty =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models["default"].Party.create(validParty);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function populateInitialParty() {
    return _ref4.apply(this, arguments);
  };
}();

exports.populateInitialParty = populateInitialParty;

var populateUser =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models["default"].User.create(testUser1);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function populateUser() {
    return _ref5.apply(this, arguments);
  };
}();

exports.populateUser = populateUser;

var mochAsync = function mochAsync(fn) {
  return function (done) {
    fn.call().then(done, function (err) {
      done(err);
    });
  };
};

exports.mochAsync = mochAsync;
//# sourceMappingURL=testData.js.map