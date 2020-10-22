'use strict'

const mongoose = require('../mock/mongoose');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const authOperations = require('../../src/operations/authOperations');

describe('Auth', () => {

  const user = { email: 'test@email.com', password: '12345678' };

  before(async () => await mongoose.connect());

  afterEach(async () => await mongoose.clearDatabase());
  
  after(async () => await mongoose.closeDatabase());

  context('[POST] /signup', () => {

    it('should create new user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect(201);

      expect(response.body).includes.keys([
        'status',
        'data',
      ]);

      expect(response.body.data.accessToken).to.not.be.undefined;
    });

    it('should return error if user already exists', async () => {
      await authOperations.signUp(user);

      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect(409);

      expect(response.body).includes.keys([
        'status',
        'message',
      ]);

      expect(response.body.message).to.equal('User with provided email address already exists.');
    });

  });

  context('[POST] /signup', () => {

    it('should sign-in and return accessToken', async () => {
      await authOperations.signUp(user);

      const response = await request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200);

      expect(response.body).includes.keys([
        'status',
        'data',
      ]);

      expect(response.body.data.accessToken).to.not.be.undefined;
    });

    it('should return error if user enter wrong combination', async () => {
      await authOperations.signUp(user);

      const response = await request(app)
        .post('/api/v1/auth/signin')
        .send({ ...user, password: '123456789' })
        .set('Accept', 'application/json')
        .expect(401);

      expect(response.body).includes.keys([
        'status',
        'message',
      ]);

      expect(response.body.message).to.equal('Wrong email/password combination.');
    });

  });

});