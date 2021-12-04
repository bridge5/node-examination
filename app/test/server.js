/**
 * supertest
 */
const request = require('supertest')
const server = require('../server.js').callback()

module.exports = request(server)
