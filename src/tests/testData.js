const validUser = {
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

export { validUser, invalidUser, invalidDataUser }
