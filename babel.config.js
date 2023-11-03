// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'transform-remove-console'],
      },
    },
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          },
          root: ['./'],
        },
      ],
    ],
    presets: ['module:metro-react-native-babel-preset'],
  };
};
