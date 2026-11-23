import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/global.css';
import { setTheme, type BookdTheme } from '../src/tokens';

const withBookdTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'dark') as BookdTheme;
  setTheme(theme);
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Bookd theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [withBookdTheme],
  parameters: {
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
  },
};

export default preview;
