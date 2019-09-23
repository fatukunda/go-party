"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Party = sequelize.define('Party', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Party title is required'
        }
      },
      len: {
        args: [5, 500],
        msg: 'Title length should be between 5 and 500 characters.'
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Party location is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Party description is required'
        }
      }
    },
    party_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Party date is required'
        }
      }
    },
    is_free: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    party_avatar: {
      type: DataTypes.STRING
    }
  }, {});

  Party.associate = function (_ref) {
    var User = _ref.User;
    Party.belongsTo(User, {
      as: 'host',
      foreignKey: 'host_id'
    });
    Party.belongsToMany(User, {
      as: 'guests',
      through: 'party_guests',
      foreignKey: 'party_id'
    });
  };

  return Party;
};

exports["default"] = _default;
//# sourceMappingURL=party.js.map