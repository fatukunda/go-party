"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _multer = require("../middleware/multer");

var _cloudinaryConfig = require("../config/cloudinaryConfig");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var addUser = _UserController["default"].addUser,
    uploadAvatar = _UserController["default"].uploadAvatar,
    findByCredentials = _UserController["default"].findByCredentials,
    verifyAccount = _UserController["default"].verifyAccount;
var router = (0, _express.Router)();
router.post('/', addUser);
router.get('/confirmation/:token', verifyAccount);
router.put('/avatar', _auth["default"], _multer.multerUploads, _cloudinaryConfig.cloudinaryConfig, uploadAvatar);
router.post('/login', findByCredentials);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=UserRoutes.js.map