import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { demoBooking } from '../../demo/fixtures';
import { withDemoNotice } from '../../demo/DemoNotice';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { MediaPlaceholder } from '../MediaPlaceholder';
import { BookingSummaryTicket } from './BookingSummaryTicket';

const meta = {
  title: 'Components/Booking/BookingSummaryTicket',
  component: BookingSummaryTicket,
  args: { ...demoBooking, status: 'confirmed' },
  argTypes: {
    status: { control: 'inline-radio', options: ['confirmed', 'pending', 'canceled'] },
    variant: { control: 'inline-radio', options: ['ticket', 'compact'] },
    media: { control: false },
    actions: { control: false },
  },
  decorators: [withDemoNotice, (Story) => <div style={{ maxWidth: 380 }}><Story /></div>],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof BookingSummaryTicket>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The signature "gig pass": notched edges and a dashed perforation, structured as a
 * heading plus a description list. No barcode or QR code: it stands for a gig both
 * sides agreed to, not an admission ticket.
 */
export const Confirmed: Story = {
  args: {
    media: <MediaPlaceholder ratio="16 / 9" />,
    actions: (
      <Button fullWidth size="lg" iconStart={<Icon name="calendar" />}>
        Add to calendar
      </Button>
    ),
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole('article', { name: 'The Lantern Room' })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: 'The Lantern Room' })).toBeVisible();
    await expect(canvas.getByText('Date')).toBeVisible();
    await expect(canvas.getByText('Fri, Mar 12, 2027')).toBeVisible();
    await expect(canvas.getByText('$150 guarantee')).toBeVisible();
    // Never a scannable code.
    await expect(canvasElement.querySelector('[class*="barcode"], [class*="qr"]')).toBeNull();
  },
};

export const Pending: Story = { args: { status: 'pending', paymentNote: undefined } };

/** Canceled: details stay readable but are struck through, with a clear badge and headline. */
export const Canceled: Story = { args: { status: 'canceled' } };

/** Minimal: no photo, pay or reference. */
export const Minimal: Story = {
  args: { status: 'confirmed', pay: undefined, reference: undefined, setLength: undefined, venueAddress: undefined },
};

/** One-line stub for inboxes and lists. Same notch and perforation, turned sideways. */
export const Compact: Story = {
  args: { variant: 'compact', status: 'pending' },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
};

export const CompactStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-3)', maxWidth: 420 }}>
      <BookingSummaryTicket {...args} variant="compact" status="confirmed" />
      <BookingSummaryTicket {...args} variant="compact" status="pending" />
      <BookingSummaryTicket {...args} variant="compact" status="canceled" />
    </div>
  ),
};

/** Light theme: the drop-shadow edge keeps the ticket and its notches visible on the pale canvas. */
export const LightTheme: Story = { globals: { theme: 'light' } };
