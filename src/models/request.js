export default (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        status: {
            type: DataTypes.ENUM(['pending', 'accepted', 'rejected']),
            defaultValue: 'pending'
        },
    }, {})
    Request.associate = function({ User, Party }) {
        Request.belongsTo(User, { foreignKey: 'guest_id', as: 'requestor'})
        Request.belongsTo(Party, { foreignKey: 'party_id', as: 'party'})
    }
    return Request
}