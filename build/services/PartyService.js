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

var PartyService =
/*#__PURE__*/
function () {
  function PartyService() {
    (0, _classCallCheck2["default"])(this, PartyService);
  }

  (0, _createClass2["default"])(PartyService, null, [{
    key: "createParty",
    value: function () {
      var _createParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(newParty) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].Party.create(newParty);

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

      function createParty(_x) {
        return _createParty.apply(this, arguments);
      }

      return createParty;
    }()
  }, {
    key: "filterPartiesByUser",
    value: function () {
      var _filterPartiesByUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(user_id, limit, offset) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].Party.findAndCountAll({
                  where: {
                    host_id: user_id
                  },
                  limit: limit,
                  offset: offset
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

      function filterPartiesByUser(_x2, _x3, _x4) {
        return _filterPartiesByUser.apply(this, arguments);
      }

      return filterPartiesByUser;
    }()
  }]);
  return PartyService;
}();

var _default = PartyService;
exports["default"] = _default;
//# sourceMappingURL=PartyService.js.map