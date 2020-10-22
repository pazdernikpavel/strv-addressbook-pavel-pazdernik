'use strict'

const catchAsync = require('../utils/catchAsync')
const validate = require('../utils/validate')
const userDto = require('../DTOs/userDto')
const authOperations = require('../operations/authOperations')

const signUp = catchAsync(async (req, res, next) => {
  const input = {
    email: req.body.email,
    password: req.body.password
  }

  validate(userDto.userAuth, input);
  const token = await authOperations.signUp(input);

  res.status(201).json({
    status: 'success',
    data: {
      accessToken: token
    }
  });
})

const signIn = catchAsync(async (req, res, next) => {
  const input = {
    email: req.body.email,
    password: req.body.password
  }

  validate(userDto.userAuth, input);
  const token = await authOperations.signIn(input);

  res.status(200).json({
    status: 'success',
    data: {
      accessToken: token
    }
  })
})

module.exports = {
  signUp,
  signIn,
}
