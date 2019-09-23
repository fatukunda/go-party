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
                limit,
                offset,
            })
        } catch (error) {
            throw error
        }
    }
}

export default PartyService
