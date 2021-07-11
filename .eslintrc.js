module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'kentcdodds',
    'kentcdodds/jest',
    'kentcdodds/react',
    'kentcdodds/jsx-a11y',
    'next',
    'plugin:import/recommended',
    'plugin:import/typescript',
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
    'no-shadow': 2,
    'no-warning-comments': 0,

    // React
    'react/self-closing-comp': 2,
    'react/react-in-jsx-scope': 0,

    // TypeScript
    // Disabling these rules temporary until types are properly defined across
    // the whole codebase.
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-argument': 0,

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],

    // Import
    'import/newline-after-import': 2,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
}
