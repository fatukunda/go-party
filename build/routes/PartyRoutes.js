"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _PartyController = _interopRequireDefault(require("../controllers/PartyController"));

var _RequestController = _interopRequireDefault(require("../controllers/RequestController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var createParty = _PartyController["default"].createParty,
    filterPartiesByUser = _PartyController["default"].filterPartiesByUser,
    viewSingleParty = _PartyController["default"].viewSingleParty,
    editParty = _PartyController["default"].editParty,
    deleteParty = _PartyController["default"].deleteParty,
    getPartyGuests = _PartyController["default"].getPartyGuests,
    searchPartiesByLocation = _PartyController["default"].searchPartiesByLocation;
var sendPartyRequest = _RequestController["default"].sendPartyRequest,
    getPartyRequests = _RequestController["default"].getPartyRequests,
    modifyPartyRequest = _RequestController["default"].modifyPartyRequest;
var router = (0, _express.Router)();
router.post('/', _auth["default"], createParty);
router.get('/createdby/:user_id', filterPartiesByUser);
router.get('/search', searchPartiesByLocation);
router.get('/:party_id', viewSingleParty);
router.patch('/:party_id', _auth["default"], editParty);
router["delete"]('/:party_id', _auth["default"], deleteParty);
router.post('/:party_id/requests', _auth["default"], sendPartyRequest);
router.get('/:party_id/requests', _auth["default"], getPartyRequests);
router.patch('/:party_id/requests/:request_id/:status', _auth["default"], modifyPartyRequest);
router.get('/:party_id/guests', _auth["default"], getPartyGuests);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=PartyRoutes.js.map