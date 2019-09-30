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
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async viewSingleParty(req, res) {
        const party_id = parseInt(req.params.party_id)
        try {
            const party = await PartyService.viewSingleParty(party_id)
            if (!party) {
                util.setError(404, 'Party not found')
                return util.send(res)
            }
            util.setSuccess(200, 'Single party', party)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async editParty(req, res) {
        // Update party
        const acceptedOptions = ['title', 'location', 'description', 'party_date', 'is_free']
        const receivedOptions = Object.keys(req.body)
        const user = req.user
        const party_id = parseInt(req.params.party_id)
        const isUpdateOption = receivedOptions.every(option => acceptedOptions.includes(option))
        if (!isUpdateOption) {
            util.setError(400, 'Invalid update options!')
            return util.send(res)
        }
        try {
            const party = await PartyService.findParty(party_id, user.id)
            if (!party) {
                util.setError(404, 'Party not found')
                return util.send(res)
            }
            receivedOptions.forEach(option => (party[option] = req.body[option]))
            await party.save()
            util.setSuccess(200, 'Party updated successfully', party)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async deleteParty(req, res) {
        const party_id = parseInt(req.params.party_id)
        const user = req.user
        try {
            const party = await PartyService.findParty(party_id, user.id)
            if (!party) {
                util.setError(404, 'Attempting to delete a non-existing party.')
                return util.send(res)
            }
            await party.destroy()
            util.setSuccess(200, 'Party successfully deleted!')
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async getPartyGuests(req, res) {
        const user = req.user
        const { party_id } = req.params
        try {
            const party = await PartyService.searchParty(party_id)
            if (!party) {
                util.setError(404, 'A party with that id does not exist.')
                return util.send(res)
            }
            if (party.host_id !== user.id) {
                util.setError(400, 'You can only view requests for a party you created.')
                return util.send(res)
            }
            const guests = await party.getGuests()
            util.setSuccess(200, 'Party guests', guests)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }
}

export default PartyController
