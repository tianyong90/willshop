module.exports = {
  'env': {
    'browser': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'extends': 'standard',
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'warn'
    ],
    'no-undef': [
      'warn'
    ],
    'no-redeclare': [
      'warn'
    ]
  }
};

