'use strict'

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async next => {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

userSchema.methods.hasProvidedCorrectPassword
  = async (passwordToVerify, userPassword) => await bcrypt.compare(passwordToVerify, userPassword)

const User = mongoose.model('User', userSchema)

module.exports = User
