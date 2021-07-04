module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  extends: [
    'xo/browser',
    'xo-react',
    'xo-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
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
    'react/react-in-jsx-scope': 0,

    // TypeScript
    // Disabling this one temporary until types are properly defined across
    // the whole codebase.
    '@typescript-eslint/no-unsafe-assignment': 0,

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
