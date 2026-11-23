import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { expect } from 'storybook/test';
import { StatusBadge } from './StatusBadge';
import { statusDefinitions, type Status } from './statuses';

const booking: Status[] = ['confirmed', 'pending', 'declined', 'canceled', 'completed'];
const venue: Status[] = ['open-gig', 'accepting-intros', 'hosts-music', 'not-booking', 'unverified'];
const opportunity: Status[] = ['open', 'closed', 'expired'];

const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-2)', alignItems: 'center' };
const heading: CSSProperties = { font: 'var(--bookd-type-label)', color: 'var(--bookd-text-secondary)', margin: 0 };

const meta = {
  title: 'Components/Display/StatusBadge',
  component: StatusBadge,
  args: { status: 'confirmed' },
  argTypes: { status: { control: 'select', options: Object.keys(statusDefinitions) } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * Three separate sets, because Bookd keeps booking process, venue availability and
 * opportunity lifecycle as separate properties. Each badge pairs an icon with text.
 * "Unverified" has a dashed edge so stale information never looks settled.
 */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-5)' }}>
      {[
        ['Booking', booking],
        ['Venue availability', venue],
        ['Opportunity', opportunity],
      ].map(([title, list]) => (
        <section key={title as string} style={{ display: 'grid', gap: 'var(--bookd-space-2)' }}>
          <h3 style={heading}>{title as string}</h3>
          <div style={row}>
            {(list as Status[]).map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-status]');
    await expect(badges).toHaveLength(booking.length + venue.length + opportunity.length);
    for (const badge of badges) {
      // Never color alone: every badge has visible text.
      await expect(badge.textContent?.trim().length).toBeGreaterThan(0);
    }
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <StatusBadge status="pending" size="sm" />
      <StatusBadge status="pending" size="md" />
    </div>
  ),
};

/** Status fills are light in both themes, so badges read the same on the shell and in a white card. */
export const OnShellAndCard: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-4)' }}>
      <div style={row}>
        {venue.map((s) => <StatusBadge key={s} status={s} />)}
      </div>
      <div
        data-bookd-theme="light"
        style={{ ...row, background: 'var(--bookd-bg-card)', padding: 'var(--bookd-space-5)', borderRadius: 'var(--bookd-radius-xl)', border: '1px solid var(--bookd-border-card)' }}
      >
        {venue.map((s) => <StatusBadge key={s} status={s} />)}
      </div>
    </div>
  ),
};

/** A custom label is allowed when it stays truthful to the status. */
export const CustomLabel: Story = { args: { status: 'open', label: 'Open to local acts' } };
