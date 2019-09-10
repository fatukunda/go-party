/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
export default class Util {
    constructor() {
        this.statusCode = null
        this.type = null
        this.data = null
        this.message = null
    }
  
    setSuccess(statusCode, message, data) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.type = 'success'
    }
  
    setError(statusCode, message) {
        this.statusCode = statusCode
        this.message = message
        this.type = 'error'
    }
  
    send(res) {
        const result = {
            status: this.type,
            message: this.message,
            data: this.data,
        }
  
        if (this.type === 'success') {
            return res.status(this.statusCode).json(result)
        }
        return res.status(this.statusCode).json({
            status: this.type,
            message: this.message,
        })
    }

    generateAuthToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '1h'})
    }
}