"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    status: {
      type: DataTypes.ENUM(['pending', 'accepted', 'rejected']),
      defaultValue: 'pending'
    }
  }, {});

  Request.associate = function (_ref) {
    var User = _ref.User,
        Party = _ref.Party;
    Request.belongsTo(User, {
      foreignKey: 'guest_id'
    });
    Request.belongsTo(Party, {
      foreignKey: 'party_id'
    });
  };

  return Request;
};

exports["default"] = _default;
//# sourceMappingURL=request.js.map