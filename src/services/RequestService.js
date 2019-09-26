import database from '../models'

class RequestService {
    static async sendPartyRequest(newRequest) {
        try {
            return await database.Request.create(newRequest)
        } catch (error) {
            throw error
        }
    }

    static async checkRequestExists(guest_id, party_id) {
        try {
            return await database.Request.findOne({
                where: {
                    guest_id,
                    party_id,
                },
            })
        } catch (error) {
            throw error
        }
    }

    static async getPartyRequests(party_id) {
        try {
            return await database.Request.findAndCountAll({
                where: {
                    party_id,
                },
                attributes: ['id', 'status'],
                include: {
                    model: database.User,
                    as: 'requestor',
                    attributes: ['id', 'username', 'email'],
                },
            })
        } catch (error) {
            throw error
        }
    }

    static async findPartyRequest(request_id) {
        try {
            return await database.Request.findByPk(request_id)
        } catch (error) {
            throw error
        }
    }
}

export default RequestService
