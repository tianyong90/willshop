module.exports = {
  root: false,
  // parserOptions: {
  //   parser: '@typescript-eslint/parser',
  // },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
  ],
  rules: {},
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/export': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/member-delimiter-style': [
          'error', {
            multiline: {
              delimiter: 'none',
            },
            singleline: {
              delimiter: 'comma',
            },
          }],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
}
