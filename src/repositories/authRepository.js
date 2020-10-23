'use strict'

const User = require('../database/models/user')

const findUserByEmail = email => User.findOne({ email })

const findUserById = id => User.findById(id)

const createUser = user => User.create(user)

const getVerifiedUser = async (email, password) => {
  const user = await User
    .findOne({ email })
    .select('password')

  if (!user || !await user.hasProvidedCorrectPassword(password, user.password)) {
    return null
  }

  return user
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getVerifiedUser,
}
