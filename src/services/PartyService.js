import database from '../models'

class PartyService {
    static async createParty(newParty) {
        try {
            return await database.Party.create(newParty)
        } catch (error) {
            throw error
        }
    }

    static async filterPartiesByUser(user_id, limit, offset) {
        try {
            return await database.Party.findAndCountAll({
                where: {
                    host_id: user_id,
                },
                attributes: [
                    'id',
                    'title',
                    'location',
                    'description',
                    'party_date',
                    'is_free',
                    'party_avatar',
                    'createdAt',
                    'updatedAt',
                ],
                include: {
                    model: database.User,
                    as: 'host',
                    attributes: ['id', 'username'],
                },
                limit,
                offset,
            })
        } catch (error) {
            throw error
        }
    }

    static async viewSingleParty(party_id) {
        try {
            return await database.Party.findByPk(party_id, {
                attributes: [
                    'id',
                    'title',
                    'location',
                    'description',
                    'party_date',
                    'is_free',
                    'party_avatar',
                    'createdAt',
                    'updatedAt',
                ],
                include: {
                    model: database.User,
                    as: 'host',
                    attributes: ['id', 'username'],
                },
            })
        } catch (error) {
            throw error
        }
    }

    static async findParty(party_id, host_id) {
        try {
            return await database.Party.findOne({
                where: {
                    id: party_id,
                    host_id,
                },
                attributes: [
                    'id',
                    'title',
                    'location',
                    'description',
                    'party_date',
                    'is_free',
                    'party_avatar',
                    'createdAt',
                    'updatedAt',
                ],
            })
        } catch (error) {
            throw error
        }
    }

    static async searchParty(party_id) {
        try {
            return await database.Party.findByPk(party_id)
        } catch (error) {
            throw error
        }
    }
}

export default PartyService
