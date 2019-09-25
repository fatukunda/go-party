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

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _RequestService = _interopRequireDefault(require("../services/RequestService"));

var _PartyService = _interopRequireDefault(require("../services/PartyService"));

var util = new _Utils["default"]();

var RequestController =
/*#__PURE__*/
function () {
  function RequestController() {
    (0, _classCallCheck2["default"])(this, RequestController);
  }

  (0, _createClass2["default"])(RequestController, null, [{
    key: "sendPartyRequest",
    value: function () {
      var _sendPartyRequest = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var user, party_id, party, request, newRequest, sentRequest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user;
                party_id = req.params.party_id;
                _context.prev = 2;
                _context.next = 5;
                return _PartyService["default"].searchParty(party_id);

              case 5:
                party = _context.sent;

                if (party) {
                  _context.next = 9;
                  break;
                }

                util.setError(404, 'The party you are requesting to attend does not exist.');
                return _context.abrupt("return", util.send(res));

              case 9:
                if (!(party.host_id === user.id)) {
                  _context.next = 12;
                  break;
                }

                util.setError(400, 'You cannot request to attend your own party.');
                return _context.abrupt("return", util.send(res));

              case 12:
                _context.next = 14;
                return _RequestService["default"].checkRequestExists(user.id, party.id);

              case 14:
                request = _context.sent;

                if (!request) {
                  _context.next = 18;
                  break;
                }

                util.setError(400, 'You have already requested to attend this party.');
                return _context.abrupt("return", util.send(res));

              case 18:
                newRequest = {
                  party_id: party.id,
                  guest_id: user.id
                };
                _context.next = 21;
                return _RequestService["default"].sendPartyRequest(newRequest);

              case 21:
                sentRequest = _context.sent;
                util.setSuccess(201, 'Request successfully sent', sentRequest);
                return _context.abrupt("return", util.send(res));

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](2);
                util.setError(400, _context.t0.message);
                return _context.abrupt("return", util.send(res));

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 26]]);
      }));

      function sendPartyRequest(_x, _x2) {
        return _sendPartyRequest.apply(this, arguments);
      }

      return sendPartyRequest;
    }()
  }, {
    key: "getPartyRequests",
    value: function () {
      var _getPartyRequests = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var user, party_id, party, requests;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = req.user;
                party_id = req.params.party_id;
                _context2.prev = 2;
                _context2.next = 5;
                return _PartyService["default"].searchParty(party_id);

              case 5:
                party = _context2.sent;

                if (party) {
                  _context2.next = 9;
                  break;
                }

                util.setError(404, 'Party does not exist.');
                return _context2.abrupt("return", util.send(res));

              case 9:
                if (!(party.host_id !== user.id)) {
                  _context2.next = 12;
                  break;
                }

                util.setError(400, 'You can only view requests for parties you created.');
                return _context2.abrupt("return", util.send(res));

              case 12:
                _context2.next = 14;
                return _RequestService["default"].getPartyRequests(party.id);

              case 14:
                requests = _context2.sent;
                util.setSuccess(200, 'Party requests', requests);
                util.send(res);
                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](2);
                util.setError(400, _context2.t0.message);
                util.send(res);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 19]]);
      }));

      function getPartyRequests(_x3, _x4) {
        return _getPartyRequests.apply(this, arguments);
      }

      return getPartyRequests;
    }()
  }]);
  return RequestController;
}();

var _default = RequestController;
exports["default"] = _default;
//# sourceMappingURL=RequestController.js.map