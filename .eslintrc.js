module.exports = {
  extends: '@react-native',
  plugins: ['sort-keys-fix', 'sort-destructure-keys', 'sort-exports'],
  root: true,
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-unused-styles': 2,
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        multiline: 'last',
        shorthandFirst: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-exports/sort-exports': ['error', {sortDir: 'asc'}],
    'sort-keys-fix/sort-keys-fix': 2,
  },
};
