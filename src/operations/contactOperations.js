'use strict'

const contactRepository = require('../repositories/contactRepository')

const createContact = async input => {
  await contactRepository.createContact(input)
}

module.exports = {
  createContact,
}
