/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Requests', 'guest_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: function down(queryInterface) {
    return queryInterface.removeColumn('Requests', 'guest_id');
  }
};
//# sourceMappingURL=20190921083555-associate-user-request.js.map