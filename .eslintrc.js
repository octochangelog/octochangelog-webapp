/* eslint-disable @typescript-eslint/no-var-requires */
const jestVersion = require('jest/package.json').version

module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['unicorn'],
  settings: {
    'import/internal-regex': '^(@app-|~)',
    jest: {
      version: jestVersion,
    },
  },
  rules: {
    // Base
    'no-shadow': 'error',
    'no-warning-comments': 'off',

    // React
    'react/self-closing-comp': 'error',
    'react/react-in-jsx-scope': 'off',

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
    // TypeScript
    {
      files: ['**/*.ts?(x)'],
      parserOptions: {
        project: ['./tsconfig.lint.json'],
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic',
          },
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
    // Jest
    {
      files: [
        'src/**/__tests__/**/*.[jt]s?(x)',
        'src/**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-formatting/recommended',
      ],
      rules: {
        'jest/consistent-test-it': 'warn',
      },
    },
    // Cypress
    { files: ['cypress/**/*.[jt]s'], extends: ['plugin:cypress/recommended'] },
  ],
}
