module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard',
  ],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'vue/html-indent': ['error', 2, { 'attribute': 1 }],
    'vue/script-indent': ['error', 2, {'baseIndent': 0}],
    'vue/jsx-uses-vars': 'error',
    'vue/require-v-for-key': 'off',
    'vue/require-default-prop': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-unused-vars': 'off',
    'vue/max-attributes-per-line': [
      'error', {
        'singleline': 3,
        'multiline': {
          'max': 1,
          'allowFirstLine': false,
        },
      }],
    'vue/component-name-in-template-casing': [
      'error', 'kebab-case', {
        'ignores': [],
      }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'indent': 'off',
    'no-undef': 'off',
    'no-new': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/export': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none'
          },
          singleline: {
            delimiter: 'comma'
          }
        }],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      }
    }
  ],
}
