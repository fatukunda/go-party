"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidDataParty = exports.invalidParty = exports.validParty = exports.invalidDataUser = exports.invalidUser = exports.validUser = void 0;
var validUser = {
  id: 1,
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
var validParty = {
  id: 1,
  title: 'Test party',
  description: 'This is a test party',
  location: 'test location',
  party_date: '02.02.2020',
  party_type: 'house party',
  host_id: validUser.id
};
exports.validParty = validParty;
var invalidParty = {
  title: 'Test party',
  description: 'This is a test party',
  location: 'test location'
};
exports.invalidParty = invalidParty;
var invalidDataParty = {
  title: 5635363,
  description: 'This is a test party',
  location: 'test location',
  party_date: '02.02.2020',
  party_type: 'house party',
  host_id: validUser.id
};
exports.invalidDataParty = invalidDataParty;
//# sourceMappingURL=testData.js.map