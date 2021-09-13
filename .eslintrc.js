module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
  ],
  settings: {
    'import/internal-regex': '^(@app-|~)',
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
  },
  rules: {
    // Base
    'no-shadow': 'error',
    'no-warning-comments': 'off',

    // React
    'react/self-closing-comp': 'error',
    'react/react-in-jsx-scope': 'off',

    // TypeScript
    // Disabling these rules temporary until types are properly defined across
    // the whole codebase.
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],

    // Import
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },

  overrides: [
    { files: ['cypress/**/*.[jt]s'], extends: ['plugin:cypress/recommended'] },
  ],
}
