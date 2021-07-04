module.exports = {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '!*.{ts,tsx,js,jsx}': ['prettier --write --ignore-unknown'],
}
