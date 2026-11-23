import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { demoVenues } from '../../demo/fixtures';
import { withDemoNotice } from '../../demo/DemoNotice';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { VenueCard } from './VenueCard';

const [lantern, tidewater, saltbox, juniper, pier] = demoVenues;
const { id: _id, ...lanternProps } = lantern;

const meta = {
  title: 'Components/Cards/VenueCard',
  component: VenueCard,
  args: { ...lanternProps, href: '#venue' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['stacked', 'compact'] },
    media: { control: false },
    action: { control: false },
  },
  decorators: [withDemoNotice],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof VenueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const narrow = (w = 360): Decorator[] => [(Story) => <div style={{ maxWidth: w }}><Story /></div>];

/** Verified venue with an open gig. The name links to the venue; the CTA stays separately clickable. */
export const Verified: Story = {
  args: {
    action: (
      <Button fullWidth iconEnd={<Icon name="arrowRight" />}>
        View open opportunities
      </Button>
    ),
  },
  decorators: narrow(),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'The Lantern Room' })).toHaveAttribute('href', '#venue');
    await expect(canvas.getByText('Verified venue')).toBeVisible();
    await expect(canvas.getByText('Open gig')).toBeVisible();
    await expect(canvas.getByText('Capacity 180')).toBeInTheDocument();
  },
};

/**
 * Unclaimed listing. Bookd knows the venue hosts music but not whether it is booking,
 * so there's no apply or intro action, only save.
 */
export const Unclaimed: Story = {
  args: {
    ...saltbox,
    action: <Button variant="secondary" fullWidth>Save venue</Button>,
  },
  decorators: narrow(),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Unclaimed listing')).toBeVisible();
    await expect(canvas.getByText('Booking unknown')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /opportunit|introduce|apply/i })).toBeNull();
  },
};

/** Verified does not mean booking: this venue is verified and not booking right now. */
export const VerifiedNotBooking: Story = { args: { ...juniper }, decorators: narrow() };

/** Claim pending with stale information: dashed "Unverified" badge. */
export const ClaimPendingUnverified: Story = { args: { ...pier }, decorators: narrow() };

export const Compact: Story = { args: { ...tidewater, variant: 'compact' }, decorators: narrow(420) };

/** Local Pulse list: venues sorted nearest first. */
export const CompactList: Story = {
  render: () => (
    <ul style={{ display: 'grid', gap: 'var(--bookd-space-3)', maxWidth: 420, padding: 0, margin: 0, listStyle: 'none' }}>
      {[...demoVenues]
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .map(({ id, ...v }) => (
          <li key={id}>
            <VenueCard {...v} variant="compact" href={`#${id}`} />
          </li>
        ))}
    </ul>
  ),
};

/** Stacked cards side by side, as on a wider screen. */
export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--bookd-space-5)' }}>
      {[lantern, tidewater, saltbox].map(({ id, ...v }) => (
        <VenueCard key={id} {...v} href={`#${id}`} />
      ))}
    </div>
  ),
};
