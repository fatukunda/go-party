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
                return _context2.abrupt("return", util.send(res));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                util.setError(400, _context2.t0.message);
                return _context2.abrupt("return", util.send(res));

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
  }, {
    key: "viewSingleParty",
    value: function () {
      var _viewSingleParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var party_id, party;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                party_id = parseInt(req.params.party_id);
                _context3.prev = 1;
                _context3.next = 4;
                return _PartyService["default"].viewSingleParty(party_id);

              case 4:
                party = _context3.sent;

                if (party) {
                  _context3.next = 8;
                  break;
                }

                util.setError(404, 'Party not found');
                return _context3.abrupt("return", util.send(res));

              case 8:
                util.setSuccess(200, 'Single party', party);
                return _context3.abrupt("return", util.send(res));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](1);
                util.setError(400, _context3.t0.message);
                return _context3.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 12]]);
      }));

      function viewSingleParty(_x5, _x6) {
        return _viewSingleParty.apply(this, arguments);
      }

      return viewSingleParty;
    }()
  }, {
    key: "editParty",
    value: function () {
      var _editParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var acceptedOptions, receivedOptions, user, party_id, isUpdateOption, party;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Update party
                acceptedOptions = ['title', 'location', 'description', 'party_date', 'is_free'];
                receivedOptions = Object.keys(req.body);
                user = req.user;
                party_id = parseInt(req.params.party_id);
                isUpdateOption = receivedOptions.every(function (option) {
                  return acceptedOptions.includes(option);
                });

                if (isUpdateOption) {
                  _context4.next = 8;
                  break;
                }

                util.setError(400, 'Invalid update options!');
                return _context4.abrupt("return", util.send(res));

              case 8:
                _context4.prev = 8;
                _context4.next = 11;
                return _PartyService["default"].findParty(party_id, user.id);

              case 11:
                party = _context4.sent;

                if (party) {
                  _context4.next = 15;
                  break;
                }

                util.setError(404, 'Party not found');
                return _context4.abrupt("return", util.send(res));

              case 15:
                receivedOptions.forEach(function (option) {
                  return party[option] = req.body[option];
                });
                _context4.next = 18;
                return party.save();

              case 18:
                util.setSuccess(200, 'Party updated successfully', party);
                return _context4.abrupt("return", util.send(res));

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](8);
                util.setError(400, _context4.t0.message);
                return _context4.abrupt("return", util.send(res));

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[8, 22]]);
      }));

      function editParty(_x7, _x8) {
        return _editParty.apply(this, arguments);
      }

      return editParty;
    }()
  }, {
    key: "deleteParty",
    value: function () {
      var _deleteParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var party_id, user, party;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                party_id = parseInt(req.params.party_id);
                user = req.user;
                _context5.prev = 2;
                _context5.next = 5;
                return _PartyService["default"].findParty(party_id, user.id);

              case 5:
                party = _context5.sent;

                if (party) {
                  _context5.next = 9;
                  break;
                }

                util.setError(404, 'Attempting to delete a non-existing party.');
                return _context5.abrupt("return", util.send(res));

              case 9:
                _context5.next = 11;
                return party.destroy();

              case 11:
                util.setSuccess(200, 'Party successfully deleted!');
                return _context5.abrupt("return", util.send(res));

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](2);
                util.setError(400, _context5.t0.message);
                return _context5.abrupt("return", util.send(res));

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 15]]);
      }));

      function deleteParty(_x9, _x10) {
        return _deleteParty.apply(this, arguments);
      }

      return deleteParty;
    }()
  }, {
    key: "getPartyGuests",
    value: function () {
      var _getPartyGuests = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var user, party_id, party, guests;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                user = req.user;
                party_id = req.params.party_id;
                _context6.prev = 2;
                _context6.next = 5;
                return _PartyService["default"].searchParty(party_id);

              case 5:
                party = _context6.sent;

                if (party) {
                  _context6.next = 9;
                  break;
                }

                util.setError(404, 'A party with that id does not exist.');
                return _context6.abrupt("return", util.send(res));

              case 9:
                if (!(party.host_id !== user.id)) {
                  _context6.next = 12;
                  break;
                }

                util.setError(400, 'You can only view requests for a party you created.');
                return _context6.abrupt("return", util.send(res));

              case 12:
                _context6.next = 14;
                return party.getGuests();

              case 14:
                guests = _context6.sent;
                util.setSuccess(200, 'Party guests', guests);
                return _context6.abrupt("return", util.send(res));

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](2);
                util.setError(400, _context6.t0.message);
                return _context6.abrupt("return", util.send(res));

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 19]]);
      }));

      function getPartyGuests(_x11, _x12) {
        return _getPartyGuests.apply(this, arguments);
      }

      return getPartyGuests;
    }()
  }, {
    key: "searchPartiesByLocation",
    value: function () {
      var _searchPartiesByLocation = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(req, res) {
        var _req$query, location, page, limit, offset, parties;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _req$query = req.query, location = _req$query.location, page = _req$query.page;
                limit = parseInt(req.query.limit) || 10;
                offset = (parseInt(page) - 1) * limit || 0;
                _context7.prev = 3;
                _context7.next = 6;
                return _PartyService["default"].searchPartiesByLocation(location, limit, offset);

              case 6:
                parties = _context7.sent;
                util.setSuccess(200, 'Parties by location', parties);
                return _context7.abrupt("return", util.send(res));

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](3);
                util.setError(400, _context7.t0.message);
                return _context7.abrupt("return", util.send(res));

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[3, 11]]);
      }));

      function searchPartiesByLocation(_x13, _x14) {
        return _searchPartiesByLocation.apply(this, arguments);
      }

      return searchPartiesByLocation;
    }()
  }]);
  return PartyController;
}();

var _default = PartyController;
exports["default"] = _default;
//# sourceMappingURL=PartyController.js.map