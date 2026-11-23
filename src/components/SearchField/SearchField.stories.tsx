import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/Inputs/SearchField',
  component: SearchField,
  args: { label: 'Search Local Pulse', onValueChange: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The clear button appears once there's text, clears it and returns focus to the field. */
export const WithValue: Story = {
  args: { defaultValue: 'folk' },
  play: async ({ canvas, userEvent, args }) => {
    const input = canvas.getByRole('searchbox', { name: 'Search Local Pulse' });
    await userEvent.click(canvas.getByRole('button', { name: 'Clear search' }));
    await expect(input).toHaveValue('');
    await expect(input).toHaveFocus();
    await expect(args.onValueChange).toHaveBeenLastCalledWith('');
    await expect(canvas.queryByRole('button', { name: 'Clear search' })).toBeNull();
  },
};

/** Filter button for the filter sheet. The active count is part of its accessible name. */
export const WithFilters: Story = {
  args: { onFiltersClick: fn(), activeFilterCount: 3 },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByRole('searchbox'), 'jazz');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('jazz');
    await userEvent.click(canvas.getByRole('button', { name: 'Filters, 3 active' }));
    await expect(args.onFiltersClick).toHaveBeenCalled();
  },
};

export const VisibleLabel: Story = { args: { label: 'Find a venue', hideLabel: false, placeholder: 'Venue name or neighborhood' } };

export const InCard: Story = {
  args: { onFiltersClick: fn() },
  decorators: [
    (Story) => (
      <div data-bookd-theme="light" style={{ background: 'var(--bookd-bg-card)', padding: 'var(--bookd-space-5)', borderRadius: 'var(--bookd-radius-xl)' }}>
        <Story />
      </div>
    ),
  ],
};
