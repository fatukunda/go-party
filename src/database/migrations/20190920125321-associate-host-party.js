'use strict'

// eslint-disable-next-line no-undef
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Parties', 'host_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        })
    },

    down: queryInterface => {
        return queryInterface.removeColumn('Parties', 'host_id')
    },
}
