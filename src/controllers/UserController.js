import jwt from 'jsonwebtoken'
import UserService from '../services/UserService'
import Util from '../utils/Utils'
import { dataUri } from '../middleware/multer'
import { uploader } from '../config/cloudinaryConfig'
import { sendActivationEmail } from '../emails/account'

const util = new Util()

class UserController {
    static async addUser(req, res) {
        const { username, email, password } = req.body
        const user = req.body
        if (!username || !email || !password) {
            util.setError(400, 'Username, email, and password are required.')
            return util.send(res)
        }
        try {
            const createdUser = await UserService.addUser(user)
            const token = util.generateAuthToken(createdUser.id)
            const activationLink = `${req.protocol}://${req.hostname}:8000${req.baseUrl}/confirmation/${token}`
            // Send a welcome email to the user
            sendActivationEmail(createdUser.email, createdUser.username, activationLink)
            const userData = { user: createdUser, token }
            util.setSuccess(201, 'User created!', userData)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async verifyAccount(req, res) {
        try {
            const token = req.params.token
            // eslint-disable-next-line no-undef
            const data = jwt.verify(token, process.env.JWT_KEY)
            await UserService.verifyAccount(data.id)
            util.setSuccess(200, 'Account activated successfully!')
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async uploadAvatar(req, res) {
        if (req.file) {
            const file = dataUri(req).content
            try {
                const result = await uploader.upload(file)
                const avatarUrl = result.url
                const user = await UserService.uploadAvatar(req.user.id, avatarUrl)
                util.setSuccess(200, 'Avatar Uploaded successfully!', user)
                return util.send(res)
            } catch (error) {
                util.setError(400, error.message)
                return util.send(res)
            }
        }
    }

    static async findByCredentials(req, res) {
        const { username, password } = req.body
        if (!username || !password) {
            util.setError(400, 'Username and password are required.')
            return util.send(res)
        }
        try {
            const user = await UserService.findByCredentials(username, password)
            const token = util.generateAuthToken(user.id)
            const userData = { user, token }
            util.setSuccess(200, 'Logged in successfully!', userData)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }

    static async fetchUserProfile(req, res) {
        const { user } = req
        user.password = undefined
        util.setSuccess(200, 'success', user)
        return util.send(res)
    }

    static async editUserProfile(req, res) {
        // Update user profile
        const acceptedOptions = ['username', 'email', 'password', 'bio', 'dob']
        const receivedOptions = Object.keys(req.body)
        const user = req.user
        const isUpdateOption = receivedOptions.every(option => acceptedOptions.includes(option))
        if (!isUpdateOption) {
            util.setError(400, 'Invalid update options!')
            return util.send(res)
        }
        try {
            receivedOptions.forEach(option => (user[option] = req.body[option]))
            await user.save()
            user.password = undefined
            util.setSuccess(200, 'User updated successfully', user)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }
}

export default UserController
