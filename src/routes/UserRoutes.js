import { Router } from 'express'
import UserController from '../controllers/UserController'
import { multerUploads } from '../middleware/multer'
import { cloudinaryConfig } from '../config/cloudinaryConfig'
import auth from '../middleware/auth'

const { addUser, uploadAvatar, findByCredentials, verifyAccount, fetchUserProfile } = UserController

const router = Router()

router.post('/', addUser)
router.get('/confirmation/:token', verifyAccount)
router.put('/avatar', auth, multerUploads, cloudinaryConfig, uploadAvatar)
router.post('/login', findByCredentials),
router.get('/me', auth, fetchUserProfile)

export default router
