import express from 'express'
import bodyParser from 'body-parser'
import config from 'dotenv'
import userRoutes from './routes/UserRoutes'

config.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/users', userRoutes)

export default app