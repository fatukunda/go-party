/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'chai/register-should'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import app from '../app'
import { validUser, invalidUser, invalidDataUser } from './testData'

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

    it('Should throw an error is something wrong happens while creating a user', done => {
        // In this test case, we are trying to create a user with an invalid email address.
        chai
            .request(app)
            .post(usersUrl)
            .set('Accept', 'application/json')
            .send(invalidDataUser)
            .end((err, res) => {
                expect(res.status).to.equal(400)
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

    it('Should throw an error if something happens while verifying an account', done => {
        // In this test case we are trying to use a wrong JWT_KEY than the one that was used to create the Token.
        const token = jwt.sign({ id: 1 }, 'wrong_jwt_key', { expiresIn: '1h' })
        chai
            .request(app)
            .get(`${usersUrl}/confirmation/${token}`)
            .set('Accept', 'application/json')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
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

    it('Should throw an error if username and password are not provided', done => {
        chai
            .request(app)
            .post(`${usersUrl}/login`)
            .set('Accept', 'application/json')
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
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
    
    it('should not edit user with invalid attribute names', done => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        const newUserDetails = {
            bio: 'This is a test bio',
            school: 'This attribute should not be there.',
        }

        chai
            .request(app)
            .patch(`${usersUrl}/profile/edit`)
            .set('Authorization', `Bearer ${token}`)
            .send(newUserDetails)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Invalid update options!')
                done()
            })
    })

    it('should edit a user', done => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        const newUserDetails = {
            bio: 'This is a test bio',
            dob: '04/02/2012',
        }

        chai
            .request(app)
            .patch(`${usersUrl}/profile/edit`)
            .set('Authorization', `Bearer ${token}`)
            .send(newUserDetails)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('User updated successfully')
                done()
            })
    })

    it('should throw an error if something goes wrong while updating a user', done => {
        // In this test case, We are passing date of birth as a string so we expect an error to happen.
        const token = jwt.sign({ id: 1 }, process.env.JWT_KEY, { expiresIn: '1h' })
        const newUserDetails = {
            bio: 'This is a test bio',
            dob: 'this is not a date',
        }

        chai
            .request(app)
            .patch(`${usersUrl}/profile/edit`)
            .set('Authorization', `Bearer ${token}`)
            .send(newUserDetails)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                done()
            })
    })
})
