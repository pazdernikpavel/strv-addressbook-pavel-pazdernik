'use strict'

const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const decodeJWTToken = async token => await promisify(jwt.verify)(token, process.env.JWT_SECRET)

const generateJWToken = user => jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: 'HS512',
  },
)

module.exports = {
  decodeJWTToken,
  generateJWToken,
}

