"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _PartyService = _interopRequireDefault(require("../services/PartyService"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var util = new _Utils["default"]();

var PartyController =
/*#__PURE__*/
function () {
  function PartyController() {
    (0, _classCallCheck2["default"])(this, PartyController);
  }

  (0, _createClass2["default"])(PartyController, null, [{
    key: "createParty",
    value: function () {
      var _createParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var user, _req$body, title, party_type, location, description, party_date, party, createdParty;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user;
                _req$body = req.body, title = _req$body.title, party_type = _req$body.party_type, location = _req$body.location, description = _req$body.description, party_date = _req$body.party_date;

                if (!(!title || !party_type || !location || !description || !party_date)) {
                  _context.next = 5;
                  break;
                }

                util.setError(400, 'All fields are required.');
                return _context.abrupt("return", util.send(res));

              case 5:
                _context.prev = 5;
                party = _objectSpread({}, req.body, {
                  host_id: user.id
                });
                _context.next = 9;
                return _PartyService["default"].createParty(party);

              case 9:
                createdParty = _context.sent;
                util.setSuccess(201, 'Party created successfully!', createdParty);
                return _context.abrupt("return", util.send(res));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](5);
                util.setError(400, _context.t0.message);
                return _context.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 14]]);
      }));

      function createParty(_x, _x2) {
        return _createParty.apply(this, arguments);
      }

      return createParty;
    }()
  }, {
    key: "filterPartiesByUser",
    value: function () {
      var _filterPartiesByUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var query, params, user_id, limit, offset, parties;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = req.query, params = req.params;
                user_id = params.user_id;
                limit = parseInt(query.limit) || 10;
                offset = (parseInt(query.page) - 1) * limit || 0;
                _context2.prev = 4;
                _context2.next = 7;
                return _PartyService["default"].filterPartiesByUser(user_id, limit, offset);

              case 7:
                parties = _context2.sent;
                util.setSuccess(200, 'User created parties', parties);
                util.send(res);
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                util.setError(400, _context2.t0.message);
                util.send(res);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 12]]);
      }));

      function filterPartiesByUser(_x3, _x4) {
        return _filterPartiesByUser.apply(this, arguments);
      }

      return filterPartiesByUser;
    }()
  }]);
  return PartyController;
}();

var _default = PartyController;
exports["default"] = _default;
//# sourceMappingURL=PartyController.js.map