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
}

export default RequestService
