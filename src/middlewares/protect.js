'use strict'

const authOperations = require('../operations/authOperations')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const token = require('../utils/token')

module.exports = catchAsync(async (req, res, next) => {
  let accessToken
  if (req.headers.authorization) {
    accessToken = req.headers.authorization
      .split('Bearer ')
      .pop()
  }

  if (!accessToken) {
    return next(new AppError(
      'Authentication is required for this kind of operation.',
      401,
    ))
  }

  const payload = await token.decodeJWTToken(accessToken)
  const user = authOperations.getUser(payload.id)

  if (!user) {
    return next(new AppError(
      'This authentication token was issued to no longer existing user.',
      401,
    ))
  }

  req.user = user
  return next()
})
