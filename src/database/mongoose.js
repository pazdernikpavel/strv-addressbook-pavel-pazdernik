'use strict'

const mongoose = require('mongoose')
const AppError = require('../utils/appError')

module.exports = {
  connect() {
    const dbConnectionString = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );
    const connection = mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    connection.then(() => {
      console.log('Connection to MongoDB database was successful!')
    }).catch(err => {
      throw new AppError(err, 500)
    })
  },
}
