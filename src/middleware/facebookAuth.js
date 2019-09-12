/* eslint-disable no-undef */
import passport from 'passport'
import { Strategy } from 'passport-facebook'

const facebookAuth = () => {
    passport.use(
        new Strategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL: 'http://localhost:8000/api/v1/users/auth/facebook/callback',
                profileFields: ['id', 'name', 'photos', 'email'],
            },
            (accessToken, refreshToken, profile, done) => {
                const { id, email, last_name, first_name, picture } = profile._json
                const user = {
                    accessToken,
                    email,
                    first_name,
                    last_name,
                    id,
                    picture,
                }
                return done(null, user)
            }
        )
    )
}

module.exports = facebookAuth
