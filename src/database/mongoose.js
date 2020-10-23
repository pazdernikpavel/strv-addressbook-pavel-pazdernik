'use strict'

const mongoose = require('mongoose')
const AppError = require('../utils/appError')

module.exports = {
  connect() {
    const dbConnectionString = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD,
    )

    const mongooseOpts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }

    const connection = mongoose.connect(dbConnectionString, mongooseOpts)

    connection.then(() => {
      // eslint-disable-next-line no-console
      console.log('Connection to MongoDB database was successful!')
    }).catch(err => {
      throw new AppError(err, 500)
    })
  },
}
