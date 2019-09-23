'use strict'

// eslint-disable-next-line no-undef
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PartyGuests', {
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            party_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            guest_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            }
        })
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('party_guests')
    }
}
