/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
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
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Invalid email. Provide a correct email.'
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 100],
                        msg: 'Password should be more than 5 characters.'
                    }
                }
            },
            bio: {
                type: Sequelize.TEXT,
                validate: {
                    len: {
                        args: [10, 500],
                        msg: 'Bio should be more than 10 characters and less than 500 characters'
                    }
                }
            },
            dob: {
                type: Sequelize.DATE
            },
            avatar: {
                type: Sequelize.BLOB
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users')
    }
}