module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  rules: {
    'vue/html-indent': ['error', 2, {'attribute': 1}],
    'vue/script-indent': ['error', 2, {'baseIndent': 0}],
    'vue/jsx-uses-vars': 'error',
    'vue/require-v-for-key': 'off',
    "vue/require-default-prop": 'off',
    "vue/name-property-casing": 'off',
    "vue/no-unused-vars": 'off',
    'vue/max-attributes-per-line': ['error', {
      "singleline": 3,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'indent': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off'
  }
}
