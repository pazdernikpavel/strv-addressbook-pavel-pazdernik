'use strict'

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 12)
  return next()
}

async function comparePasswords(passwordToVerify, userPassword) {
  return await bcrypt.compare(passwordToVerify, userPassword)
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validator: validator.isEmail,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

userSchema.pre('save', hashPassword)

userSchema.methods.hasProvidedCorrectPassword = comparePasswords

const User = mongoose.model('User', userSchema)

module.exports = User
