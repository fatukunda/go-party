import jwt from 'jsonwebtoken'
import database from '../models'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // eslint-disable-next-line no-undef
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await database.User.findOne({ where: { id: data.id } })
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
export default auth
