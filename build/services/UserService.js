"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(newUser) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].User.create(newUser);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function addUser(_x) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "verifyAccount",
    value: function () {
      var _verifyAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].User.update({
                  is_active: true
                }, {
                  where: {
                    id: id
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function verifyAccount(_x2) {
        return _verifyAccount.apply(this, arguments);
      }

      return verifyAccount;
    }()
  }, {
    key: "uploadAvatar",
    value: function () {
      var _uploadAvatar = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(userId, avatar) {
        var user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].User.update({
                  avatar: avatar
                }, {
                  returning: true,
                  where: {
                    id: userId
                  }
                });

              case 3:
                user = _context3.sent;
                return _context3.abrupt("return", user[1][0]);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function uploadAvatar(_x3, _x4) {
        return _uploadAvatar.apply(this, arguments);
      }

      return uploadAvatar;
    }()
  }, {
    key: "findByCredentials",
    value: function () {
      var _findByCredentials = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(username, password) {
        var user, isPasswordMatch;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context4.sent;

                if (user) {
                  _context4.next = 6;
                  break;
                }

                throw new Error('Invalid login credentials');

              case 6:
                _context4.next = 8;
                return _bcrypt["default"].compare(password, user.password);

              case 8:
                isPasswordMatch = _context4.sent;

                if (isPasswordMatch) {
                  _context4.next = 11;
                  break;
                }

                throw new Error('Invalid login credentials');

              case 11:
                if (user.is_active) {
                  _context4.next = 13;
                  break;
                }

                throw new Error('Please verify your account.');

              case 13:
                return _context4.abrupt("return", user);

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 16]]);
      }));

      function findByCredentials(_x5, _x6) {
        return _findByCredentials.apply(this, arguments);
      }

      return findByCredentials;
    }()
  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;
//# sourceMappingURL=UserService.js.map