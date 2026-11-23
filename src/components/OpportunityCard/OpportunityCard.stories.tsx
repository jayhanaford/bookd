import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { demoOpportunities } from '../../demo/fixtures';
import { withDemoNotice } from '../../demo/DemoNotice';
import { Button } from '../Button';
import { OpportunityCard } from './OpportunityCard';

const [open, closed, expired] = demoOpportunities.map(({ id: _id, ...o }) => o);

const meta = {
  title: 'Components/Cards/OpportunityCard',
  component: OpportunityCard,
  args: { ...open, href: '#gig', action: <Button size="sm">Apply</Button> },
  argTypes: {
    status: { control: 'inline-radio', options: ['open', 'closed', 'expired'] },
    action: { control: false },
  },
  decorators: [withDemoNotice, (Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof OpportunityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Friday acoustic night' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Apply' })).toBeVisible();
    await expect(canvas.getByText('Fri, Mar 12, 8:00 to 10:00 PM')).toBeVisible();
  },
};

/** Closed: the card stays readable but the Apply action is removed. */
export const Closed: Story = {
  args: { ...closed },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('No longer taking applications')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Apply' })).toBeNull();
  },
};

export const Expired: Story = { args: { ...expired } };

export const List: Story = {
  render: () => (
    <ul style={{ display: 'grid', gap: 'var(--bookd-space-3)', padding: 0, margin: 0, listStyle: 'none' }}>
      {demoOpportunities.map(({ id, ...o }) => (
        <li key={id}>
          <OpportunityCard {...o} href={`#${id}`} action={<Button size="sm">Apply</Button>} />
        </li>
      ))}
    </ul>
  ),
};
