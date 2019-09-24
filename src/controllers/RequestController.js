import Util from '../utils/Utils'
import RequestService from '../services/RequestService'
import PartyService from '../services/PartyService'
const util = new Util()

class RequestController {
    static async sendPartyRequest(req, res) {
        const user = req.user
        const party_id = req.params.party_id
        try {
            const party = await PartyService.searchParty(party_id)
            if (!party) {
                util.setError(404, 'The party you are requesting to attend does not exist.')
                return util.send(res)
            }
            if (party.host_id === user.id) {
                util.setError(400, 'You cannot request to attend your own party.')
                return util.send(res)
            }
            const request = await RequestService.checkRequestExists(user.id, party.id)
            if (request) {
                util.setError(400, 'You have already requested to attend this party.')
                return util.send(res)
            }
            const newRequest = {
                party_id: party.id,
                guest_id: user.id,
            }
            const sentRequest = await RequestService.sendPartyRequest(newRequest)
            util.setSuccess(201, 'Request successfully sent', sentRequest)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }
}

export default RequestController
