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
      'src/**',
    ],

    rules: {
      'no-process-env': 'off',
      'new-cap': 'off',
      'no-underscore-dangle': 'off',
      'require-atomic-updates': 'off',
      'mocha/no-return-from-async': 'off',
      'no-warning-comments': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    },

    parser: 'babel-eslint',
  }, {
    files: [
      'tests/**',
    ],

    rules: {
      'no-underscore-dangle': 'off',
      'no-process-env': 'off',
      'mocha/no-return-from-async': 'off',
      'no-warning-comments': 'off',
      'no-unused-expressions': 'off',
      'no-await-in-loop': 'off',
    },

    parser: 'babel-eslint',
  }],
}
