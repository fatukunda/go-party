/* eslint-disable no-undef */
require('dotenv').config()

const development = {
    database: 'party-timeDB',
    username: 'postgres',
    password: 'makanda2000',
    host: 'localhost',
    dialect: 'postgres',
}
const test = {
    database: 'party_time_testdb',
    username: 'postgres',
    password: 'makanda2000',
    host: 'localhost',
    dialect: 'postgres',
}
const production = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
}

module.exports = { development, test, production }
