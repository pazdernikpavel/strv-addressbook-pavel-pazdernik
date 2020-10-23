'use strict'

const serviceAccount = require(`${process.cwd()}/src/config/serviceAccounts/firebase.json`)
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://strv-addressbook-pazdernik.firebaseio.com',
})

const database = admin.firestore()

module.exports = database
