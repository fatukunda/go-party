"use strict";

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
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email. Provide a correct email.'
        }
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
      type: DataTypes.BLOB
    }
  }, {});

  User.associate = function (models) {// associations can be defined here
  };

  return User;
};
//# sourceMappingURL=user.js.map