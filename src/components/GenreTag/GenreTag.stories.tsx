import type { Meta, StoryObj } from '@storybook/react-vite';
import { demoGenres } from '../../demo/fixtures';
import { GenreTag } from './GenreTag';

const meta = {
  title: 'Components/Display/GenreTag',
  component: GenreTag,
  args: { children: 'Indie' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['soft', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof GenreTag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Gray pill used inside white cards. */
export const Soft: Story = {};

/** Bordered pill for the dark shell, e.g. on a venue detail header. */
export const Outline: Story = { args: { variant: 'outline' } };

/** Static labels. To let people pick genres, use FilterChip. */
export const Group: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-4)' }}>
      <ul aria-label="Genres" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-1-5)', padding: 0, margin: 0, listStyle: 'none' }}>
        {demoGenres.map((g) => (
          <li key={g}><GenreTag {...args} variant="outline">{g}</GenreTag></li>
        ))}
      </ul>
      <ul
        aria-label="Genres in a card"
        data-bookd-theme="light"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-1-5)', padding: 'var(--bookd-space-5)', margin: 0, listStyle: 'none', background: 'var(--bookd-bg-card)', borderRadius: 'var(--bookd-radius-xl)' }}
      >
        {demoGenres.map((g) => (
          <li key={g}><GenreTag {...args} variant="soft">{g}</GenreTag></li>
        ))}
      </ul>
    </div>
  ),
};
