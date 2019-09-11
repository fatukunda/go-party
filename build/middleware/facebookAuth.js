"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = require("passport-facebook");

/* eslint-disable no-undef */
var facebookAuth = function facebookAuth() {
  _passport["default"].use(new _passportFacebook.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/v1/users/auth/facebook/callback',
    profileFields: ['id', 'name', 'photos', 'email']
  }, function (accessToken, refreshToken, profile, done) {
    var _profile$_json = profile._json,
        id = _profile$_json.id,
        email = _profile$_json.email,
        last_name = _profile$_json.last_name,
        first_name = _profile$_json.first_name,
        picture = _profile$_json.picture;
    var user = {
      accessToken: accessToken,
      email: email,
      first_name: first_name,
      last_name: last_name,
      id: id,
      picture: picture
    };
    return done(null, user);
  }));
};

module.exports = facebookAuth;
//# sourceMappingURL=facebookAuth.js.map