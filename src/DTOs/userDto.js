'use strict'

const userAuth = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', format: 'email', required: true },
    password: { type: 'string', required: true, minLength: 8 },
  },
}

module.exports = {
  userAuth
}
