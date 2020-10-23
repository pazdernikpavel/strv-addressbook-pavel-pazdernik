'use strict'

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

const connect = async () => {
  const uri = await mongod.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  await mongoose.connect(uri, mongooseOpts)
}

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

const clearDatabase = () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    if (collections.hasOwnProperty(key)) {
      const collection = collections[key]
      collection.deleteMany()
    }
  }
}

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
}
