/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Parties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      party_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_free: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      party_avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Parties');
  }
};
//# sourceMappingURL=20190919124709-create-party.js.map