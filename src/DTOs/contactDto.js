'use strict'

const createContact = {
  type: 'Object',
  required: true,
  properties: {
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    phoneNumber: { type: 'string', required: true },
    address: { type: 'string', required: true },
  },
}

module.exports = {
  createContact,
}
