'use strict'

module.exports = {
  extends: [
    '@strv/eslint-config-node/v12',
    '@strv/eslint-config-node/optional',
    '@strv/eslint-config-node/style',
    '@strv/eslint-config-mocha',
  ],

  overrides: [{
    files: [
      'test/**',
    ],

    rules: {
      'no-process-env': 'off',
    },
  }],
}
