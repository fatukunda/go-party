import Util from '../utils/Utils'
import PartyService from '../services/PartyService'

const util = new Util()

class PartyController {
    static async createParty(req, res) {
        const user = req.user
        const { title, party_type, location, description, party_date } = req.body
        if (!title || !party_type || !location || !description || !party_date) {
            util.setError(400, 'All fields are required.')
            return util.send(res)
        }
        try {
            const party = {
                ...req.body,
                host_id: user.id,
            }
            const createdParty = await PartyService.createParty(party)
            util.setSuccess(201, 'Party created successfully!', createdParty)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async filterPartiesByUser(req, res) {
        const { query, params } = req
        const { user_id } = params
        const limit = parseInt(query.limit) || 10
        const offset = (parseInt(query.page) - 1) * limit || 0
        try {
            const parties = await PartyService.filterPartiesByUser(user_id, limit, offset)
            util.setSuccess(200, 'User created parties', parties)
            util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            util.send(res)
        }
    }
}

export default PartyController
