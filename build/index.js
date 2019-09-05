"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

// eslint-disable-next-line no-undef
var port = process.env.PORT || 8000;

_app["default"].listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("Server running on port ".concat(port));
});
//# sourceMappingURL=index.js.map