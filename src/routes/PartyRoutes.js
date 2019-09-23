import { Router } from 'express'
import PartyController from '../controllers/PartyController'
import auth from '../middleware/auth'

const { createParty, filterPartiesByUser } = PartyController

const router = Router()

router.post('/', auth, createParty)
router.get('/createdby/:user_id', filterPartiesByUser)

export default router
