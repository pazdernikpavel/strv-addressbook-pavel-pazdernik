'use strict'

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const decodeJWTToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

const generateJWToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      algorithm: 'HS512'
    },
  );
};

module.exports = {
  decodeJWTToken,
  generateJWToken
};

