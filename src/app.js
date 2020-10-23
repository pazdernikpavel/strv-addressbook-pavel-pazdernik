'use strict'

const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const mongoose = require('./database/mongoose')
const authRouter = require('./routes/authRoutes')
const contactRouter = require('./routes/contactRoutes')
const errorHandler = require('./middlewares/error')

// ENVIRONMENT CONFIG
const defaultEnv = 'production'
const env = process.env.NODE_ENV || defaultEnv
dotenv.config({ path: `${process.cwd()}/src/config/${env}.env` })

// INIT EXPRESS APP
const app = express()
const port = process.env.PORT || 3000

// MIDDLEWARES
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(hpp())
app.use(mongoSanitize())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// DEV LOGGING
if (process.env.LOGGING === 'true') {
  app.use(morgan('dev'))
}

// ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)

// ERROR HANDLING
app.all('*', errorHandler.handleNotFoundError)
app.use(errorHandler.handleGlobalError)

// DB CONNECTION
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect()
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on localhost:${port}`)
})

module.exports = app
