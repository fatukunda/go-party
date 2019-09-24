/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'chai/register-should'
import jwt from 'jsonwebtoken'
import app from '../app'
import { populateUser, populateParty, validRequest, validUser, mochAsync, populateInitialParty } from './testData'

const partyUrl = '/api/v1/parties'

chai.use(chaiHttp)
const { expect } = chai

describe('Testing the party requests endpoints', () => {
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_KEY, { expiresIn: '1h' })
    it(
        'Should send a party request',
        mochAsync(async () => {
            await populateUser()
            await populateParty()
            await populateInitialParty()
            let res = await chai
                .request(app)
                .post(`${partyUrl}/2/requests`)
                .set('Authorization', `Bearer ${token}`)
                .send(validRequest)
            expect(res.status).to.equal(201)
            expect(res.body.message).to.equal('Request successfully sent')
            expect(res.body.data.status).to.equal('pending')
        })
    )

    it(
        'Should throw a 404 if the party does not exist',
        mochAsync(async () => {
            let res = await chai
                .request(app)
                .post(`${partyUrl}/4/requests`)
                .set('Authorization', `Bearer ${token}`)
                .send(validRequest)
            expect(res.status).to.equal(404)
            expect(res.body.message).to.equal('The party you are requesting to attend does not exist.')
        })
    )

    it(
        'Should throw a 400 when a user requests to attend their own party',
        mochAsync(async () => {
            let res = await chai
                .request(app)
                .post(`${partyUrl}/1/requests`)
                .set('Authorization', `Bearer ${token}`)
                .send(validRequest)
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('You cannot request to attend your own party.')
        })
    )

    it(
        'Should throw a 400 when a user requests to attend a party that they have already requested to attend',
        mochAsync(async () => {
            let res = await chai
                .request(app)
                .post(`${partyUrl}/2/requests`)
                .set('Authorization', `Bearer ${token}`)
                .send(validRequest)
            expect(res.status).to.equal(400)
            expect(res.body.message).to.equal('You have already requested to attend this party.')
        })
    )

    it(
        'Should throw a 400 when something wrong happens trying to send a party request',
        mochAsync(async () => {
            let res = await chai
                .request(app)
                // The url expects an integer but a string is provided
                .post(`${partyUrl}/invaliddata/requests`)
                .set('Authorization', `Bearer ${token}`)
                .send(validRequest)
            expect(res.status).to.equal(400)
            expect(res.body.status).to.equal('error')
        })
    )
})
