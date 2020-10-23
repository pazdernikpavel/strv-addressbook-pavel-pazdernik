'use strict'

const catchAsync = require('../utils/catchAsync')
const validate = require('../utils/validate')
const contactDto = require('../DTOs/contactDto')
const contactOperations = require('../operations/contactOperations')

const createContact = catchAsync(async (req, res, next) => {
  const input = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  }

  validate(contactDto.createContact, input)
  await contactOperations.createContact(input)

  res.status(201).json({
    status: 'success',
  })
})

module.exports = {
  createContact,
}
