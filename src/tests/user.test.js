/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'chai/register-should'
import app from '../app'
import { validUser, invalidUser } from './testData'

const usersUrl = '/api/v1/users'

chai.use(chaiHttp)
const { expect } = chai

describe('Testing the user endpoints:', () => {
    it('should create a user', done => {
        const { username, email, password } = validUser
        chai
            .request(app)
            .post(usersUrl)
            .set('Accept', 'application/json')
            .send(validUser)
            .end((err, res) => {
                expect(res.status).to.equal(201)
                expect(res.body.data).to.include({
                    id: 1,
                    username,
                    email,
                    password,
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
})
