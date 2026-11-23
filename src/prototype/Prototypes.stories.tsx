import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { BookdPrototype } from './BookdPrototype';
import { screenIds } from './nav';

/**
 * Clickable, high-fidelity Bookd prototypes built from the approved Figma screens
 * ("◆ High-fi screens"). Every button and row is live: tap through a flow inside the
 * phone frame. Things outside the prototype show a short "not part of this prototype"
 * message instead of a dead end. All data is fictional; photos are AI-generated.
 */
const meta = {
  title: 'Prototypes/Bookd app',
  component: BookdPrototype,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    docs: { story: { inline: false, iframeHeight: 960 } },
  },
  argTypes: {
    initialScreen: { control: 'select', options: screenIds },
  },
} satisfies Meta<typeof BookdPrototype>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole app from the Welcome screen. Get started → Local Pulse, then go anywhere. */
export const FullApp: Story = {
  name: 'Full app (start at Welcome)',
  args: { initialScreen: 'welcome' },
};

/**
 * Flow A · Finding a venue. Local Pulse → The Lantern Room (verified, accepting intros)
 * → Introduce yourself. Harborside Taproom shows the unclaimed branch.
 */
export const FlowA: Story = {
  name: 'Flow A · Finding a venue',
  args: { initialScreen: 'local-pulse' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('link', { name: 'The Lantern Room' }));
    await userEvent.click(await canvas.findByRole('button', { name: /Introduce yourself/ }));
    await userEvent.click(await canvas.findByRole('button', { name: /Send introduction/ }));
    await expect(await canvas.findByRole('button', { name: /Intro sent/ })).toBeVisible();
  },
};

/** Flow A branch: an unclaimed venue. No apply or intro, only public info, outreach and follow. */
export const FlowAUnclaimed: Story = {
  name: 'Flow A · Unclaimed venue',
  args: { initialScreen: 'venue-unclaimed' },
};

/**
 * Flow B · Applying to a gig. Gig detail → Apply → Application sent → (prototype
 * shortcut) Booking offer v2 → Accept → Confirmed ticket.
 */
export const FlowB: Story = {
  name: 'Flow B · Applying to a gig',
  args: { initialScreen: 'gig-detail' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Apply to this gig/ }));
    await userEvent.click(await canvas.findByRole('button', { name: /Send application/ }));
    await expect(await canvas.findByRole('heading', { name: 'Application sent' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /venue sends an offer/ }));
    await userEvent.click(await canvas.findByRole('button', { name: /Accept offer/ }));
    await expect(await canvas.findByRole('heading', { name: /You.re booked/ })).toBeVisible();
  },
};

/** My Bookd home and Connections. Accepting the offer in Flow B updates both. */
export const MyBookd: Story = {
  name: 'My Bookd + Connections',
  args: { initialScreen: 'my-bookd' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Connections' }));
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Connections' })).toBeVisible());
  },
};

/** Flow C · Venue posts a recurring gig. My Lineup → Basics → Schedule → Preview → Publish. */
export const FlowC: Story = {
  name: 'Flow C · Venue posts a recurring gig',
  args: { initialScreen: 'lineup' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Post a gig' }));
    await userEvent.click(await canvas.findByRole('button', { name: /Next: schedule/ }));
    await userEvent.click(await canvas.findByRole('button', { name: /Preview dates/ }));
    await userEvent.click(await canvas.findByRole('button', { name: /Publish 10 open dates/ }));
    await expect((await canvas.findAllByText('10 open dates published')).length).toBeGreaterThan(0);
  },
};

/** Jump straight to any screen with the "initialScreen" control. */
export const AnyScreen: Story = {
  name: 'Screen picker',
  args: { initialScreen: 'offer' },
};
