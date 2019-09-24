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

var RequestService =
/*#__PURE__*/
function () {
  function RequestService() {
    (0, _classCallCheck2["default"])(this, RequestService);
  }

  (0, _createClass2["default"])(RequestService, null, [{
    key: "sendPartyRequest",
    value: function () {
      var _sendPartyRequest = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(newRequest) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].Request.create(newRequest);

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

      function sendPartyRequest(_x) {
        return _sendPartyRequest.apply(this, arguments);
      }

      return sendPartyRequest;
    }()
  }, {
    key: "checkRequestExists",
    value: function () {
      var _checkRequestExists = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(guest_id, party_id) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].Request.findOne({
                  where: {
                    guest_id: guest_id,
                    party_id: party_id
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

      function checkRequestExists(_x2, _x3) {
        return _checkRequestExists.apply(this, arguments);
      }

      return checkRequestExists;
    }()
  }]);
  return RequestService;
}();

var _default = RequestService;
exports["default"] = _default;
//# sourceMappingURL=RequestService.js.map