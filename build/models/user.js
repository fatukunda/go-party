"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/* eslint-disable no-undef */
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username is required.'
        },
        len: {
          args: [3, 15],
          msg: 'Username length should be between 3 and 15 characters.'
        },
        isUnique: function () {
          var _isUnique = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee(value) {
            var user;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return User.findOne({
                      where: {
                        username: value
                      }
                    });

                  case 2:
                    user = _context.sent;

                    if (!user) {
                      _context.next = 5;
                      break;
                    }

                    throw new Error('A user with that username already exists.');

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function isUnique(_x) {
            return _isUnique.apply(this, arguments);
          }

          return isUnique;
        }()
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email. Provide a correct email.'
        },
        isUnique: function () {
          var _isUnique2 = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee2(value) {
            var user;
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return User.findOne({
                      where: {
                        email: value
                      }
                    });

                  case 2:
                    user = _context2.sent;

                    if (!user) {
                      _context2.next = 5;
                      break;
                    }

                    throw new Error('A user with that email already exists.');

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function isUnique(_x2) {
            return _isUnique2.apply(this, arguments);
          }

          return isUnique;
        }()
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password should be more than 5 characters.'
        }
      }
    },
    bio: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [10, 500],
          msg: 'Bio should be more than 10 characters and less than 500 characters'
        }
      }
    },
    dob: {
      type: DataTypes.DATE
    },
    avatar: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});

  User.associate = function (models) {// associations can be defined here
  };

  User.beforeCreate(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(user) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _bcrypt["default"].hash(user.password, 8);

            case 3:
              user.password = _context3.sent;
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              throw new Error('Something went wrong');

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }));

    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }());
  User.beforeUpdate(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(user) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (!user.password) {
                _context4.next = 5;
                break;
              }

              _context4.next = 4;
              return _bcrypt["default"].hash(user.dataValues.password, 8);

            case 4:
              user.password = _context4.sent;

            case 5:
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              throw new Error('Could not update the password');

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  return User;
};
//# sourceMappingURL=user.js.map