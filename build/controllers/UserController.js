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
        var _req$body, username, email, password, user, createdUser;

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
                util.setSuccess(201, 'User created!', createdUser);
                return _context.abrupt("return", util.send(res));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](5);
                util.setError(400, _context.t0.message);
                return _context.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 13]]);
      }));

      function addUser(_x, _x2) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;
//# sourceMappingURL=UserController.js.map