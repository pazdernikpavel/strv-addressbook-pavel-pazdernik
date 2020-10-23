'use strict'

const expect = require('chai').expect
const token = require('../../src/utils/token')

describe('token.js', () => {
  before(() => {
    process.env.JWT_SECRET = 'random-secret'
    process.env.JWT_EXPIRES_IN = '5m'
  })

  it('should generate valid JWT token', async () => {
    const user = {
      email: 'user@test.com',
      _id: '37873826726372378',
    }

    const generatedToken = token.generateJWToken(user)
    expect(generatedToken).to.not.be.null()
    const payload = await token.decodeJWTToken(generatedToken)
    expect(payload.id).to.equals(user._id)
  })
})
