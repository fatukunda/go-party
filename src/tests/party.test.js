/* eslint-disable no-undef */
import chai from 'chai'
import chaiHttp from 'chai-http'
import 'chai/register-should'
import jwt from 'jsonwebtoken'
import app from '../app'
import { validParty, invalidParty, validUser, invalidDataParty } from './testData'

const partyUrl = '/api/v1/parties'

chai.use(chaiHttp)
const { expect } = chai

describe('Testing the party endpoints', () => {
    const token = jwt.sign({ id: validUser.id }, process.env.JWT_KEY, { expiresIn: '1h' })
    it('should create a party', done => {
        chai
            .request(app)
            .post(partyUrl)
            .set('Authorization', `Bearer ${token}`)
            .send(validParty)
            .end((err, res) => {
                expect(res.status).to.equal(201)
            })
        done()
    })

    it('Should not create a party with incomplete required fields', done => {
        chai
            .request(app)
            .post(partyUrl)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidParty)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('Should throw an error if something wrong happens while creating a party', done => {
        // In this test case, we are trying to create a party with an invalid title.
        chai
            .request(app)
            .post(partyUrl)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidDataParty)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('Should fetch parties for a given user', done => {
        chai
            .request(app)
            .get(`${partyUrl}/createdby/1`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.count).to.equal(1)
                done()
            })
    })

    it('Should throw an error when something goes wrong while fetching user parties', done => {
        chai
            .request(app)
        //In this test case, we are trying to provide a string as a parameter but am integer is expected. Therefore, an error will be thrown and our test will pass.
            .get(`${partyUrl}/createdby/invalidstringinput`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('Should view details of a single party', done => {
        chai
            .request(app)
            .get(`${partyUrl}/1`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Single party')
                done()
            })
    })

    it('Should throw 404 if party is not found', done => {
        chai
            .request(app)
            .get(`${partyUrl}/50`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('Party not found')
                done()
            })
    })

    it('Should throw 400 if something wrong happens while fetching a party', done => {
        chai
            .request(app)
        // Tring to pass an invalid data type of party id will throw a 400 error
            .get(`${partyUrl}/invaliddata`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('Should edit a party', done => {
        const editData = {
            description: 'edited description',
            title: 'edited title',
            is_free: false,
            party_date: '02:10:2020',
        }
        chai
            .request(app)
            .patch(`${partyUrl}/1`)
            .set('Authorization', `Bearer ${token}`)
            .send(editData)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.title).to.equal('edited title')
                done()
            })
    })

    it('Should throw a 404 when a party to edit does not exist', done => {
        const editData = {
            description: 'edited description',
            title: 'edited title',
            is_free: false,
            party_date: '02:10:2020',
        }
        chai
            .request(app)
            .patch(`${partyUrl}/4`)
            .set('Authorization', `Bearer ${token}`)
            .send(editData)
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('Party not found')
                done()
            })
    })

    it('Should throw a 400 when an invalid update option is given', done => {
        const editData = {
            description: 'edited description',
            title: 'edited title',
            is_free: false,
            party_date: '02:10:2020',
            // address is an invalid update option. The app should therefore throw a 400 error.
            address: 'invalid update option',
        }
        chai
            .request(app)
            .patch(`${partyUrl}/1`)
            .set('Authorization', `Bearer ${token}`)
            .send(editData)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.message).to.equal('Invalid update options!')
                done()
            })
    })

    it('Should throw 400 if something wrong happens while updating a party', done => {
        const editData = {
            description: 'edited description',
            title: 'edited title',
            is_free: false,
            party_date: '02:10:2020',
        }
        chai
            .request(app)
        // Trying to pass an invalid data type of party id will throw a 400 error
            .patch(`${partyUrl}/invaliddata`)
            .set('Authorization', `Bearer ${token}`)
            .send(editData)
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('should get party guests', done => {
        chai
            .request(app)
            .get(`${partyUrl}/1/guests`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Party guests')
                done()
            })
    })

    it('should throw a 404 if a aparty does not exist', done => {
        chai
            .request(app)
            .get(`${partyUrl}/4/guests`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('A party with that id does not exist.')
                done()
            })
    })

    it('should throw a 400 if something goes wrong while fetching party guests', done => {
        chai
            .request(app)
        // Route expects a number but a string is provided.
            .get(`${partyUrl}/invalidinput/guests`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })

    it('Should delete a party', done => {
        chai
            .request(app)
            .delete(`${partyUrl}/1`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Party successfully deleted!')
                done()
            })
    })

    it('Should throw a 404 when a party to delete does not exist', done => {
        chai
            .request(app)
            .delete(`${partyUrl}/4`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal('Attempting to delete a non-existing party.')
                done()
            })
    })

    it('Should throw 400 if something wrong happens while deleting a party', done => {
        chai
            .request(app)
        // Trying to pass an invalid data type of party id will throw a 400 error
            .delete(`${partyUrl}/invaliddata`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.status).to.equal('error')
                done()
            })
    })
})
