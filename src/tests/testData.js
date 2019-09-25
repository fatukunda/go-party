import database from '../models'

const validUser = {
    id: 1,
    username: 'testUser',
    password: 'testPassword',
    email: 'test@app.com',
}

const invalidUser = {
    username: 'testUser',
    password: 'testPass',
}

const testUser1 = {
    id: 2,
    username: 'testuser1',
    password: 'testuserpass1',
    email: 'testuser@app.com',
}

const testUser2 = {
    id: 3,
    username: 'testuser2',
    password: 'testuserpass2',
    email: 'testuser2@app.com',
}

const testParty1 = {
    id: 2,
    title: 'Test party 1',
    description: 'This is a test party 1',
    location: 'test location 1',
    party_date: '02.02.2020',
    party_type: 'house party 1',
    host_id: testUser1.id,
}

const testParty2 = {
    id: 3,
    title: 'Test party 2',
    description: 'This is a test party 2',
    location: 'test location 2',
    party_date: '02.02.2020',
    party_type: 'house party 2',
    host_id: testUser1.id,
}

const invalidDataUser = {
    username: 12345,
    password: 'testPassword',
    email: 'app.com',
}

const validParty = {
    id: 1,
    title: 'Test party',
    description: 'This is a test party',
    location: 'test location',
    party_date: '02.02.2020',
    party_type: 'house party',
    host_id: validUser.id,
}

const invalidParty = {
    title: 'Test party',
    description: 'This is a test party',
    location: 'test location',
}

const invalidDataParty = {
    title: 5635363,
    description: 'This is a test party',
    location: 'test location',
    party_date: '02.02.2020',
    party_type: 'house party',
    host_id: validUser.id,
}

const validRequest = {
    id: 1,
    guest_id: testUser1.id,
    party_id: testParty1.id,
}

const destroyUser = async () => {
    return await database.User.destroy({ where: { id: 2 } })
}
const destroyParty = async () => {
    return await database.Party.destroy({ where: { id: 2 } })
}

const populateParty = async () => {
    return await database.Party.create(testParty1)
}

const populateInitialParty = async () => {
    return await database.Party.create(validParty)
}

const populateUser = async () => {
    return await database.User.create(testUser1)
}

const mochAsync = fn => {
    return done => {
        fn.call().then(done, err => {
            done(err)
        })
    }
}

export {
    validUser,
    invalidUser,
    invalidDataUser,
    validParty,
    invalidParty,
    invalidDataParty,
    populateUser,
    destroyUser,
    populateParty,
    destroyParty,
    validRequest,
    mochAsync,
    populateInitialParty,
}
