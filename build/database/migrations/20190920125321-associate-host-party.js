'use strict'; // eslint-disable-next-line no-undef

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Parties', 'host_id', {
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
    return queryInterface.removeColumn('Parties', 'host_id');
  }
};
//# sourceMappingURL=20190920125321-associate-host-party.js.map