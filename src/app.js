'use strict'

const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const AppError = require('./utils/appError')
const mongoose = require('./database/mongoose')
const authRouter = require('./routes/authRoutes')
const contactRouter = require('./routes/contactRoutes')
const globalErrorHandler = require('./middlewares/error')

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
app.use(cookieParser())

// DEV LOGGING
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)

// ERROR HANDLING
app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404))
})
app.use(globalErrorHandler);

// DB CONNECTION
mongoose.connect()

app.listen(port, () => {
  console.log(`Express server listening on localhost:${port}`)
})
