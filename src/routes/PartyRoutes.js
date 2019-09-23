import { Router } from 'express'
import PartyController from '../controllers/PartyController'
import auth from '../middleware/auth'

const { createParty, filterPartiesByUser, viewSingleParty } = PartyController

const router = Router()

router.post('/', auth, createParty)
router.get('/createdby/:user_id', filterPartiesByUser)
router.get('/:party_id', viewSingleParty)

export default router
