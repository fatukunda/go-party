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

var _UserService = _interopRequireDefault(require("../services/UserService"));

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
                return _context2.abrupt("return", util.send(res));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](2);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

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
  }, {
    key: "withdrawPartyRequest",
    value: function () {
      var _withdrawPartyRequest = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var user, request_id, request;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = req.user;
                request_id = req.params.request_id;
                _context3.prev = 2;
                _context3.next = 5;
                return _RequestService["default"].findPartyRequest(request_id);

              case 5:
                request = _context3.sent;

                if (request) {
                  _context3.next = 9;
                  break;
                }

                util.setError(404, 'That party request does not exist.');
                return _context3.abrupt("return", util.send(res));

              case 9:
                if (!(request.guest_id !== user.id)) {
                  _context3.next = 12;
                  break;
                }

                util.setError(401, 'You can only withdraw your own requests.');
                return _context3.abrupt("return", util.send(res));

              case 12:
                _context3.next = 14;
                return request.destroy();

              case 14:
                util.setSuccess(200, 'Party request successfully withdrawn');
                return _context3.abrupt("return", util.send(res));

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](2);
                util.setError(400, _context3.t0.message);
                return _context3.abrupt("return", util.send(res));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 18]]);
      }));

      function withdrawPartyRequest(_x5, _x6) {
        return _withdrawPartyRequest.apply(this, arguments);
      }

      return withdrawPartyRequest;
    }()
  }, {
    key: "modifyPartyRequest",
    value: function () {
      var _modifyPartyRequest = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var user, params, party_id, request_id, status, party, request, guest;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                user = req.user, params = req.params;
                party_id = params.party_id, request_id = params.request_id, status = params.status;
                _context4.prev = 2;
                _context4.next = 5;
                return _PartyService["default"].searchParty(party_id);

              case 5:
                party = _context4.sent;

                if (party) {
                  _context4.next = 9;
                  break;
                }

                util.setError(404, 'Party with that request does not exist.');
                return _context4.abrupt("return", util.send(res));

              case 9:
                if (!(party.host_id !== user.id)) {
                  _context4.next = 12;
                  break;
                }

                util.setError(400, 'You cannot alter a request for a party you did not create.');
                return _context4.abrupt("return", util.send(res));

              case 12:
                _context4.next = 14;
                return _RequestService["default"].findPartyRequest(request_id);

              case 14:
                request = _context4.sent;

                if (request) {
                  _context4.next = 18;
                  break;
                }

                util.setError(404, 'The request you are trying to alter does not exist.');
                return _context4.abrupt("return", util.send(res));

              case 18:
                _context4.next = 20;
                return _UserService["default"].findUser(request.guest_id);

              case 20:
                guest = _context4.sent;
                _context4.next = 23;
                return _RequestService["default"].modifyPartyRequest(request.id, status);

              case 23:
                if (!(status === 'accepted')) {
                  _context4.next = 26;
                  break;
                }

                _context4.next = 26;
                return party.addGuests(guest);

              case 26:
                util.setSuccess(200, 'Party request altered.');
                return _context4.abrupt("return", util.send(res));

              case 30:
                _context4.prev = 30;
                _context4.t0 = _context4["catch"](2);
                util.setError(400, _context4.t0.message);
                return _context4.abrupt("return", util.send(res));

              case 34:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 30]]);
      }));

      function modifyPartyRequest(_x7, _x8) {
        return _modifyPartyRequest.apply(this, arguments);
      }

      return modifyPartyRequest;
    }()
  }]);
  return RequestController;
}();

var _default = RequestController;
exports["default"] = _default;
//# sourceMappingURL=RequestController.js.map