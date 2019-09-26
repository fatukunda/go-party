import { Router } from 'express'
import PartyController from '../controllers/PartyController'
import RequestController from '../controllers/RequestController'
import auth from '../middleware/auth'

const { createParty, filterPartiesByUser, viewSingleParty, editParty, deleteParty } = PartyController
const { sendPartyRequest, getPartyRequests, modifyPartyRequest } = RequestController

const router = Router()

router.post('/', auth, createParty)
router.get('/createdby/:user_id', filterPartiesByUser)
router.get('/:party_id', viewSingleParty)
router.patch('/:party_id', auth, editParty)
router.delete('/:party_id', auth, deleteParty)
router.post('/:party_id/requests', auth, sendPartyRequest)
router.get('/:party_id/requests', auth, getPartyRequests)
router.patch('/:party_id/requests/:request_id/:status', auth, modifyPartyRequest )
export default router
