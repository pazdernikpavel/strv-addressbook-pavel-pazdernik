'use strict'

const { expect } = require('chai')
const request = require('supertest')
const mongoose = require('../mock/mongoose')
const app = require('../../src/app')
const authOperations = require('../../src/operations/authOperations')

describe('Contact', () => {
  const contact = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+11 171616161',
    address: 'Doetown',
  }

  const user = {
    email: 'test@email.com',
    password: '12345678',
  }

  before(async () => await mongoose.connect())

  afterEach(async () => await mongoose.clearDatabase())

  after(async () => await mongoose.closeDatabase())

  context('[POST] /api/v1/contact', () => {
    it('should be unauthorized if accessToken is not present', async () => {
      const response = await request(app)
        .post('/api/v1/contact')
        .send(contact)
        .set('Accept', 'application/json')
        .expect(401)

      expect(response.body).includes.keys([
        'status',
        'message',
      ])

      expect(response.body.message).to
        .equal('Authentication is required for this kind of operation.')
    })

    it('should receive bad request if wrong data input is sent', async () => {
      const token = await authOperations.signUp(user)
      const response = await request(app)
        .post('/api/v1/contact')
        .send({ ...contact, firstName: null })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      expect(response.body).includes.keys([
        'status',
        'message',
      ])

      expect(response.body.message).to.equal('Invalid input data.')
    })

    /**
     * eslint
     * TODO: Mock Firestore / Stub response
     *
     * Possible solution: https://bit.ly/37xcDNl
     * npm i firebase-functions-test --save-dev
     */
    it.skip('should create new contact', async () => {
      const token = await authOperations.signUp(user)
      await request(app)
        .post('/api/v1/contact')
        .send(contact)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
    })
  })
})
