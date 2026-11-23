import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { expect, fn } from 'storybook/test';
import { Button, type ButtonVariant } from './Button';

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

const variants: ButtonVariant[] = ['primary', 'primary-solid', 'secondary', 'tertiary'];
const row: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-3)', alignItems: 'center' };

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  args: { children: 'Request booking', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The gradient CTA. Dark label on the gradient: white text fails AA on the pink stop (3.5:1). */
export const Primary: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

/** Solid pink fallback for places a gradient can't render (email, some native surfaces). */
export const PrimarySolid: Story = { args: { variant: 'primary-solid' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Message venue' } };
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'View all' } };

export const WithIcons: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} iconStart={<CalendarIcon />}>Add to calendar</Button>
      <Button {...args} iconEnd={<ArrowIcon />}>View open opportunities</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
};

/** Loading keeps the label for screen readers, sets aria-busy, and ignores clicks. */
export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button');
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={row}>
      {variants.map((v) => (
        <Button key={v} {...args} variant={v} disabled>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, size: 'lg', iconStart: <CalendarIcon /> },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Button {...args} />
    </div>
  ),
};

/**
 * Every variant on the dark shell and inside a white card. The card is a light-theme
 * island (`data-bookd-theme="light"`), so outline and accent colors invert for it.
 * Tab through to check focus rings on both backgrounds.
 */
export const OnShellAndCard: Story = {
  globals: { theme: 'dark' },
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-6)' }}>
      <div style={row}>
        {variants.map((v) => (
          <Button key={v} {...args} variant={v}>{v}</Button>
        ))}
      </div>
      <div
        data-bookd-theme="light"
        style={{
          ...row,
          background: 'var(--bookd-bg-card)',
          color: 'var(--bookd-text-primary)',
          border: 'var(--bookd-border-width-1) solid var(--bookd-border-card)',
          borderRadius: 'var(--bookd-radius-xl)',
          padding: 'var(--bookd-space-6)',
        }}
      >
        {variants.map((v) => (
          <Button key={v} {...args} variant={v}>{v}</Button>
        ))}
      </div>
    </div>
  ),
};
