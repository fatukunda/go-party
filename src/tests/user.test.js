/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'chai/register-should'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import app from '../app'
import { validUser, invalidUser } from './testData'

const usersUrl = '/api/v1/users'

chai.use(chaiHttp)
const { expect } = chai

describe('Testing the user endpoints:', () => {
    it('should create a user', done => {
        const { username, email } = validUser
        chai
            .request(app)
            .post(usersUrl)
            .set('Accept', 'application/json')
            .send(validUser)
            .end((err, res) => {
                expect(res.status).to.equal(201)
                expect(res.body.data.user).to.include({
                    id: 1,
                    username,
                    email,
                })
                done()
            })
    })

    it('Should not create a user with incomplete required fields', done => {
        chai
            .request(app)
            .post(usersUrl)
            .set('Accept', 'application/json')
            .send(invalidUser)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('Should not login an unverified account', done => {
        const { username, password } = validUser
        chai
            .request(app)
            .post(`${usersUrl}/login`)
            .set('Accept', 'application/json')
            .send({ username, password })
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Please verify your account.')
                done()
            })
    })

    it('Should verify an account', done => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        chai
            .request(app)
            .get(`${usersUrl}/confirmation/${token}`)
            .set('Accept', 'application/json')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Account activated successfully!')
                done()
            })
    })

    it('Should login an with a verified account', done => {
        const { username, password } = validUser
        chai
            .request(app)
            .post(`${usersUrl}/login`)
            .set('Accept', 'application/json')
            .send({ username, password })
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Logged in successfully!')
                done()
            })
    })

    it('should not upload avatar by unauthorized user', done => {
        chai
            .request(app)
            .put(`${usersUrl}/avatar`)
            .attach('image', fs.readFileSync('src/tests/fixtures/andela2.jpg'), 'andela2.png')
            .end((err, res) => {
                expect(res.status).to.equal(401)
                expect(res.body.error).to.equal('Not authorized to access this resource')
                done()
            })
    })

    it('should upload avatar by authorized user', done => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        chai
            .request(app)
            .put(`${usersUrl}/avatar`)
            .set('Authorization', `Bearer ${token}`)
            .attach('image', fs.readFileSync('src/tests/fixtures/andela2.jpg'), 'andela2.png')
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Avatar Uploaded successfully!')
                done()
            })
    })

    it('should fetch current user profile', done => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        chai
            .request(app)
            .get(`${usersUrl}/me`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('success')
                done()
            })
    })
})
