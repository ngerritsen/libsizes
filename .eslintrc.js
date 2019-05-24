'use strict';

module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'prettier',
    'react'
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100
      }
    ]
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2016,
    'ecmaFeatures': {
      'blockBindings': true,
      'jsx': true,
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  }
}
