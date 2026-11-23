import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { demoGenres } from '../../demo/fixtures';
import { Icon } from '../Icon';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'Components/Inputs/FilterChip',
  component: FilterChip,
  args: { children: 'Indie', onSelectedChange: fn() },
  argTypes: { icon: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const chip = canvas.getByRole('button', { name: 'Indie' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(args.onSelectedChange).toHaveBeenCalledWith(true);
  },
};

/** Selected uses the gradient, a dark label and a check mark. */
export const Selected: Story = { args: { selected: true } };

export const WithIconAndCount: Story = {
  args: { icon: <Icon name="calendar" />, children: 'This week', count: 12 },
};

export const Disabled: Story = { args: { disabled: true } };

/** A working genre filter row. Tab to a chip and press Space or Enter to toggle it. */
export const GenreFilterRow: Story = {
  render: function Render() {
    const [picked, setPicked] = useState<string[]>(['Indie', 'Folk']);
    const toggle = (g: string) => setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));
    return (
      <div role="group" aria-label="Filter by genre" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-2)' }}>
        {demoGenres.map((g) => (
          <FilterChip key={g} selected={picked.includes(g)} onSelectedChange={() => toggle(g)}>
            {g}
          </FilterChip>
        ))}
      </div>
    );
  },
  play: async ({ canvas, userEvent }) => {
    const rock = canvas.getByRole('button', { name: 'Rock' });
    await userEvent.click(rock);
    await expect(rock).toHaveAttribute('aria-pressed', 'true');
    rock.blur();
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(canvas.getByRole('button', { name: 'Indie' })).toHaveAttribute('aria-pressed', 'false');
  },
};

/** Inside a white card the chip outline and text invert. */
export const InCard: Story = {
  render: (args) => (
    <div data-bookd-theme="light" style={{ display: 'flex', gap: 'var(--bookd-space-2)', background: 'var(--bookd-bg-card)', padding: 'var(--bookd-space-5)', borderRadius: 'var(--bookd-radius-xl)' }}>
      <FilterChip {...args}>Indie</FilterChip>
      <FilterChip {...args} selected>Rock</FilterChip>
    </div>
  ),
};
