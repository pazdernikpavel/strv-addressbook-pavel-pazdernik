'use strict'

const { assert, expect } = require('chai')
const validate = require('../../src/utils/validate')

const carDto = {
  type: 'Object',
  required: true,
  properties: {
    name: { type: 'string', required: true },
    make: { type: 'string', required: true },
    doors: { type: 'number', required: true },
  },
}

describe('validate.js', () => {
  it('should pass if valid data input is provided', () => {
    const input = {
      name: 'Green car',
      make: 'Nicest cars',
      doors: 5,
    }

    const fn = () => {
      validate(carDto, input)
    }

    assert.doesNotThrow(fn)
  })

  it('should throw error if invalid data input is provided', () => {
    const input = {
      name: 'Red truck',
    }

    const fn = () => {
      validate(carDto, input)
    }

    expect(fn).to.throw(Error, 'Invalid input data.')
  })
})
