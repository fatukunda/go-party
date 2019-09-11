"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidDataUser = exports.invalidUser = exports.validUser = void 0;
var validUser = {
  username: 'testUser',
  password: 'testPassword',
  email: 'test@app.com'
};
exports.validUser = validUser;
var invalidUser = {
  username: 'testUser',
  password: 'testPass'
};
exports.invalidUser = invalidUser;
var invalidDataUser = {
  username: 12345,
  password: 'testPassword',
  email: 'app.com'
};
exports.invalidDataUser = invalidDataUser;
//# sourceMappingURL=testData.js.map