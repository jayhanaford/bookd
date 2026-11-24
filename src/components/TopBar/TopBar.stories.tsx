import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/Navigation/TopBar',
  component: TopBar,
  args: { title: 'Gig detail' },
  decorators: [(Story) => <div style={{ maxWidth: 393 }}><Story /></div>],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Back button, centered title and a save action. */
export const Default: Story = {
  args: {
    leading: { icon: 'chevronLeft', label: 'Back', onClick: fn() },
    trailing: [{ icon: 'heart', label: 'Save gig', onClick: fn() }],
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Back' }));
    await expect(args.leading?.onClick).toHaveBeenCalled();
  },
};

/** Close button for a task screen such as Apply. */
export const Close: Story = {
  args: { title: 'Apply', leading: { icon: 'x', label: 'Close' } },
};

/** Over a photo or gradient header: no title, round dark buttons. */
export const Overlay: Story = {
  args: {
    title: undefined,
    variant: 'overlay',
    leading: { icon: 'chevronLeft', label: 'Back' },
    trailing: [
      { icon: 'heart', label: 'Save venue', pressed: true },
      { icon: 'more', label: 'More options' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'linear-gradient(160deg, #7a1f5c, #3b1053)', paddingBlock: 8 }}>
        <Story />
      </div>
    ),
  ],
};
