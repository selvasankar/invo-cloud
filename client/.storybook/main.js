module.exports = {
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};
