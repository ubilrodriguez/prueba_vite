// En tu archivo principal (ej: server.js)
require('dotenv').config();

const express = require('express');
const app = express();
const config = {
  connectionSQL: `Data Source=${process.env.DB_HOST};Initial Catalog=${process.env.DB_NAME};Persist Security Info=True;User ID=${process.env.DB_USER_ADO};Password=${process.env.DB_PASSWORD_ADO};TrustServerCertificate=${process.env.DB_TRUST_SERVER_CERT};`,
  sqlConfig: {
    user: process.env.DB_USER_SQL,
    password: process.env.DB_PASSWORD_SQL,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT)
    },
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERT === 'true'
    }
  }
}

module.exports = config;