"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _RequestController = _interopRequireDefault(require("../controllers/RequestController"));

var _multer = require("../middleware/multer");

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var addUser = _UserController["default"].addUser,
    uploadAvatar = _UserController["default"].uploadAvatar,
    findByCredentials = _UserController["default"].findByCredentials,
    verifyAccount = _UserController["default"].verifyAccount,
    editUserProfile = _UserController["default"].editUserProfile,
    fetchUserProfile = _UserController["default"].fetchUserProfile,
    loginFacebookUser = _UserController["default"].loginFacebookUser;
var withdrawPartyRequest = _RequestController["default"].withdrawPartyRequest;
var router = (0, _express.Router)();
router.post('/', addUser);
router.get('/confirmation/:token', verifyAccount);
router.put('/avatar', _auth["default"], _multer.multerUploads, _cloudinaryConfig.cloudinaryConfig, uploadAvatar);
router.post('/login', findByCredentials), router.get('/me', _auth["default"], fetchUserProfile);
router.patch('/profile/edit', _auth["default"], editUserProfile);
router.get('/facebook', loginFacebookUser);
router.get('/auth/facebook', _passport["default"].authenticate('facebook'));
router.get('/auth/facebook/callback', _passport["default"].authenticate('facebook', {
  successRedirect: 'http://localhost:8000/api/v1/users/facebook',
  failureRedirect: '/'
}));
router["delete"]('/me/requests/:request_id', _auth["default"], withdrawPartyRequest);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UserRoutes.js.map