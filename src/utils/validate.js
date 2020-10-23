'use strict'

const jsonschema = require('jsonschema')
const AppError = require('./appError')

module.exports = (dto, input) => {
  const validator = new jsonschema.Validator()
  dto.additionalProperties = false

  const validationErrors = validator.validate(input, dto).errors
  if (validationErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.log(validationErrors)
    throw new AppError('Invalid input data.', 400)
  }
}
