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
    host_id: validUser.id
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
    host_id: validUser.id
}

export { validUser, invalidUser, invalidDataUser, validParty, invalidParty, invalidDataParty }
