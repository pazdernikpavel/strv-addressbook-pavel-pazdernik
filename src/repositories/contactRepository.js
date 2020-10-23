'use strict'

const firestore = require('../database/firestore')

const createContact = async input => {
  await firestore
    .collection('contacts')
    .add(input)
}

module.exports = {
  createContact,
}
