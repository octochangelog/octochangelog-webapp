module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  globals: {
    React: 'writable',
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'react-app',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'xo/browser',
    'xo-typescript',
    'plugin:@next/next/recommended',
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
    'import/no-unresolved': [2, { ignore: ['unist'] }],
  },
}
