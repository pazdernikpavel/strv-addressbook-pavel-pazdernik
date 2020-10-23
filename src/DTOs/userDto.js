'use strict'

const signUp = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', format: 'email', required: true },
    password: { type: 'string', required: true, minLength: 8 },
  },
}

const signIn = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
}

module.exports = {
  signIn,
  signUp,
}
