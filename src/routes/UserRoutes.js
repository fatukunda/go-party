import { Router } from 'express'
import UserController from '../controllers/UserController'
import { multerUploads } from '../middleware/multer'
import { cloudinaryConfig } from '../config/cloudinaryConfig'
import auth from '../middleware/auth'

const { addUser, uploadAvatar, findByCredentials } = UserController

const router = Router()

router.post('/', addUser)
router.put('/avatar', auth, multerUploads, cloudinaryConfig, uploadAvatar)
router.post('/login', auth, findByCredentials)

export default router
