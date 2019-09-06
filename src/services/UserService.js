import database from '../models'
import bcrypt from 'bcrypt'

class UserService {
    static async addUser(newUser) {
        try {
            return await database.User.create(newUser)
        } catch (error) {
            throw error
        }
    }
    static async uploadAvatar(userId, avatar) {
        try {
            const user = await database.User.update({ avatar }, { returning: true, where: { id: userId } })
            return user[1][0]
        } catch (error) {
            throw error
        }
    }

    static async findByCredentials(username, password) {
        try {
            const user = await database.User.findOne({where: {username }})
            if (!user) {
                throw new Error('Invalid login credentials')
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                throw new Error('Invalid login credentials')
            }
            return user
        } catch (error) {
            throw error
        }
    }
}

export default UserService
