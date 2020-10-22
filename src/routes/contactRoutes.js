'use strict'

const express = require('express')
const contactController = require('../controllers/contactController')
const protect = require('../middlewares/protect')

const router = express.Router()

router
  .route('/')
  .post(
    protect,
    contactController.createContact);

module.exports = router
