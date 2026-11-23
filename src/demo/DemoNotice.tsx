import type { Decorator } from '@storybook/react-vite';
import { DEMO_NOTICE } from './fixtures';

/** Storybook decorator: labels stories that use fictional demo data. */
export const withDemoNotice: Decorator = (Story) => (
  <div style={{ display: 'grid', gap: 'var(--bookd-space-4)' }}>
    <Story />
    <p style={{ margin: 0, font: 'var(--bookd-type-caption)', color: 'var(--bookd-text-secondary)' }}>
      {DEMO_NOTICE}
    </p>
  </div>
);
