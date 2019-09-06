import UserService from '../services/UserService'
import Util from '../utils/Utils'
import { dataUri } from '../middleware/multer'
import { uploader } from '../config/cloudinaryConfig'

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
            const userData = { user: createdUser, token }
            util.setSuccess(201, 'User created!', userData)
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
}

export default UserController
