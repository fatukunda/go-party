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

var _UserService = _interopRequireDefault(require("../services/UserService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _multer = require("../middleware/multer");

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var util = new _Utils["default"]();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, username, email, password, user, createdUser, token, userData;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
                user = req.body;

                if (!(!username || !email || !password)) {
                  _context.next = 5;
                  break;
                }

                util.setError(400, 'Username, email, and password are required.');
                return _context.abrupt("return", util.send(res));

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return _UserService["default"].addUser(user);

              case 8:
                createdUser = _context.sent;
                token = util.generateAuthToken(createdUser.id);
                userData = {
                  user: createdUser,
                  token: token
                };
                util.setSuccess(201, 'User created!', userData);
                return _context.abrupt("return", util.send(res));

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](5);
                util.setError(400, _context.t0.message);
                return _context.abrupt("return", util.send(res));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 15]]);
      }));

      function addUser(_x, _x2) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "uploadAvatar",
    value: function () {
      var _uploadAvatar = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var file, result, avatarUrl, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!req.file) {
                  _context2.next = 18;
                  break;
                }

                file = (0, _multer.dataUri)(req).content;
                _context2.prev = 2;
                _context2.next = 5;
                return _cloudinaryConfig.uploader.upload(file);

              case 5:
                result = _context2.sent;
                avatarUrl = result.url;
                _context2.next = 9;
                return _UserService["default"].uploadAvatar(req.user.id, avatarUrl);

              case 9:
                user = _context2.sent;
                util.setSuccess(200, 'Avatar Uploaded successfully!', user);
                return _context2.abrupt("return", util.send(res));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](2);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 14]]);
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
      _regenerator["default"].mark(function _callee3(req, res) {
        var _req$body2, username, password, user, token, userData;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;

                if (!(!username || !password)) {
                  _context3.next = 4;
                  break;
                }

                util.setError(400, 'Username and password are required.');
                return _context3.abrupt("return", util.send(res));

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return _UserService["default"].findByCredentials(username, password);

              case 7:
                user = _context3.sent;
                token = util.generateAuthToken(user.id);
                userData = {
                  user: user,
                  token: token
                };
                util.setSuccess(200, 'Logged in successfully!', userData);
                return _context3.abrupt("return", util.send(res));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](4);
                util.setError(400, _context3.t0.message);
                return _context3.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 14]]);
      }));

      function findByCredentials(_x5, _x6) {
        return _findByCredentials.apply(this, arguments);
      }

      return findByCredentials;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=UserController.js.map