import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import userRoutes from './routes/UserRoutes'
// eslint-disable-next-line no-undef
require('./middleware/facebookAuth')(passport)

config.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// eslint-disable-next-line no-undef
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use('/api/v1/users', userRoutes)

export default app
