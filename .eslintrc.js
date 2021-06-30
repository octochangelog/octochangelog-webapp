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
    'prettier',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'no-shadow': 2,
    'react/react-in-jsx-scope': 0, // not necessary anymore since React v17
    'react/self-closing-comp': 2,
    'import/newline-after-import': 2,
    'import/order': [
      2,
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
}
