import { Router } from 'express'
import passport from 'passport'
import UserController from '../controllers/UserController'
import RequestController from '../controllers/RequestController'
import { multerUploads } from '../middleware/multer'
import { cloudinaryConfig } from '../config/cloudinaryConfig'
import auth from '../middleware/auth'

const { addUser, uploadAvatar, findByCredentials, verifyAccount, editUserProfile, fetchUserProfile, loginFacebookUser } = UserController
const { withdrawPartyRequest } = RequestController

const router = Router()

router.post('/', addUser)
router.get('/confirmation/:token', verifyAccount)
router.put('/avatar', auth, multerUploads, cloudinaryConfig, uploadAvatar)
router.post('/login', findByCredentials),
router.get('/me', auth, fetchUserProfile)
router.patch('/profile/edit', auth, editUserProfile)
router.get('/facebook', loginFacebookUser)
router.get('/auth/facebook', passport.authenticate('facebook'))
router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:8000/api/v1/users/facebook',
        failureRedirect: '/',
    })    
)
router.delete('/me/requests/:request_id', auth, withdrawPartyRequest)

export default router
