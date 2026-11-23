import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect } from 'storybook/test';
import { BottomNavigation } from './BottomNavigation';
import { musicianTabs, venueTabs } from './tabs';

const meta = {
  title: 'Components/Navigation/BottomNavigation',
  component: BottomNavigation,
  args: { items: musicianTabs, activeId: 'local-pulse' },
  decorators: [(Story) => <div style={{ maxWidth: 393 }}><Story /></div>],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Musician app tabs. Click a tab to move the active state. */
export const Musician: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.activeId);
    return <BottomNavigation {...args} activeId={active} onSelect={setActive} />;
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Connections' }));
    await expect(canvas.getByRole('button', { name: 'Connections' })).toHaveAttribute('aria-current', 'page');
  },
};

/** Venue app tabs (My Lineup). */
export const Venue: Story = {
  args: { items: venueTabs, activeId: 'my-lineup', label: 'Venue' },
};
