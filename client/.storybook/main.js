const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
    'storybook-addon-next-router',
  ],
  staticDirs: ['../public'],
  features: {
    emotionAlias: false,
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    return config;
  },
};
