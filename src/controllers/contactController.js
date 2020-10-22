'use strict'

const catchAsync = require('../utils/catchAsync')

const createContact = catchAsync(async (_, res, __) => {
  res.status(200).json();
})

module.exports = {
  createContact,
}
