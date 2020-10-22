'use strict'

const User = require('../database/models/user');

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserById = async (id) => {
  return User.findById(id);
};

const createUser = async (user) => {
  return User.create(user);
};

const getVerifiedUser = async (email, password) => {
  const user = await User
    .findOne({ email })
    .select('password');

  if (!user || !await user.hasProvidedCorrectPassword(password, user.password)) {
    return null;
  } else return user;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getVerifiedUser
};
