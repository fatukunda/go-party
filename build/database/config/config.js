"use strict";

/* eslint-disable no-undef */
require('dotenv').config();

var development = {
  database: 'party-timeDB',
  username: 'postgres',
  password: 'makanda2000',
  host: 'localhost',
  dialect: 'postgres'
};
var test = {
  database: 'party_time_testDB',
  username: 'postgres',
  password: 'makanda2000',
  host: 'localhost',
  dialect: 'postgres'
};
var production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'postgres'
};
module.exports = {
  development: development,
  test: test,
  production: production
};
//# sourceMappingURL=config.js.map