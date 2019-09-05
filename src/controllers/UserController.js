import UserService from '../services/UserService'
import Util from '../utils/Utils'

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
            util.setSuccess(201, 'User created!', createdUser)
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message)
            return util.send(res)
        }
    }
}

export default UserController
