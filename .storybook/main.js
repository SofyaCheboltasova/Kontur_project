const Path = require('path');

const sourceDir = Path.resolve(__dirname, '..', 'src');
const isDev = process.env.ENV === 'development';

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    const candidate = config.module.rules.find((item) => 'icon.svg'.match(item.test));
    candidate.exclude = [sourceDir];

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};
