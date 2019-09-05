import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.post('/', UserController.addUser)

export default router
