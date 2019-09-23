export default (sequelize, DataTypes) => {
    const Party = sequelize.define(
        'Party',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Party title is required',
                    },
                },
                len: {
                    args: [5, 500],
                    msg: 'Title length should be between 5 and 500 characters.',
                },
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Party location is required',
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Party description is required',
                    },
                },
            },
            party_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Party date is required',
                    },
                },
            },
            is_free: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            party_avatar: {
                type: DataTypes.STRING,
            },
        },
        {}
    )
    Party.associate = ({ User }) => {
        Party.belongsTo(User, { as: 'host', foreignKey: 'host_id' })
        Party.belongsToMany(User, { as: 'guests', through: 'party_guests', foreignKey: 'party_id' })
    }
    return Party
}
