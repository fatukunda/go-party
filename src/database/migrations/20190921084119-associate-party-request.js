/* eslint-disable no-undef */
'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Requests', 'party_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Parties',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Requests', 'party_id')
    }
}
