'use strict'

const authRepository = require('../repositories/authRepository')
const token = require('../utils/token')
const AppError = require('../utils/appError')

const signUp = async input => {
  const alreadyExists = Boolean(await authRepository.findUserByEmail(input.email))
  if (alreadyExists) {
    throw new AppError('User with provided email address already exists.', 409)
  }

  const user = await authRepository.createUser(input)
  return token.generateJWToken(user)
}

const signIn = async input => {
  const user = await authRepository.getVerifiedUser(input.email, input.password)
  if (!user) {
    throw new AppError('Wrong email/password combination.', 401)
  }

  return token.generateJWToken(user)
}

const getUser = async id => {
  const user = await authRepository.findUserById(id)
  return user
}

module.exports = {
  signUp,
  signIn,
  getUser,
}
