import type { StorybookConfig } from '@storybook/react-vite';

// Bookd's own Storybook. Fully independent from any other design system.
// Runs on port 6007 (see package.json) so it never clashes with another
// Storybook on the default 6006.
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
};
export default config;
