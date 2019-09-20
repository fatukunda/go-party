/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Requests', 'party_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Parties',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: function down(queryInterface) {
    return queryInterface.removeColumn('Requests', 'party_id');
  }
};
//# sourceMappingURL=20190921084119-associate-party-request.js.map