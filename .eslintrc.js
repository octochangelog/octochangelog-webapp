module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
  ],
  plugins: ['unicorn'],
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

    // Unicorn
    'unicorn/no-for-loop': 'error',
    'unicorn/no-array-for-each': 'error',
    'unicorn/no-array-reduce': 'error',
  },

  overrides: [
    { files: ['cypress/**/*.[jt]s'], extends: ['plugin:cypress/recommended'] },
  ],
}
