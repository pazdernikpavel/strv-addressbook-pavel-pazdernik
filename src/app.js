'use strict'

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// ENVIRONMENT CONFIG
const defaultEnv = 'production';
const env = process.env.NODE_ENV || defaultEnv;
dotenv.config({ path: `./config/${env}.env` });

// INIT EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// DEV LOGGING
if (env === 'development') {
  app.use(morgan('dev'));
}

// ROUTES


app.listen(
  port,
  () => {}
);