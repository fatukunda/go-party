"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _UserRoutes = _interopRequireDefault(require("./routes/UserRoutes"));

var _PartyRoutes = _interopRequireDefault(require("./routes/PartyRoutes"));

// eslint-disable-next-line no-undef
require('./middleware/facebookAuth')(_passport["default"]);

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // eslint-disable-next-line no-undef

app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

_passport["default"].serializeUser(function (user, done) {
  done(null, user);
});

_passport["default"].deserializeUser(function (user, done) {
  done(null, user);
});

app.use('/api/v1/users', _UserRoutes["default"]);
app.use('/api/v1/parties', _PartyRoutes["default"]);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map