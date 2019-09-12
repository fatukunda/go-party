"use strict";

/* eslint-disable no-undef */
require('dotenv').config();

var development = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'postgres'
};
var test = {
  database: process.env.TEST_DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
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