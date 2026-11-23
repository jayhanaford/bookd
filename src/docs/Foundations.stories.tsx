import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars, type BookdToken } from '../tokens';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;
export default meta;
type Story = StoryObj;

const names = Object.keys(vars) as BookdToken[];
const pick = (prefix: string) => names.filter((n) => n.startsWith(`bookd-${prefix}`));

const label = { font: 'var(--bookd-type-xs-default)', color: 'var(--bookd-text-soft-500)' };

function Swatches({ tokens }: { tokens: BookdToken[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--bookd-space-3)' }}>
      {tokens.map((t) => (
        <div key={t}>
          <div
            style={{
              height: 48,
              borderRadius: 'var(--bookd-radius-md)',
              background: vars[t],
              border: 'var(--bookd-border-width-1) solid var(--bookd-border-soft-100)',
            }}
          />
          <code style={label}>{t}</code>
        </div>
      ))}
    </div>
  );
}

/** Semantic colors switch with the theme toolbar. Build UI from these. */
export const SemanticColors: Story = {
  render: () => (
    <>
      {['bg', 'text', 'fg', 'border', 'brand', 'state'].map((g) => (
        <section key={g} style={{ marginBottom: 'var(--bookd-space-8)' }}>
          <h3 style={{ font: 'var(--bookd-type-lg-emphasized)' }}>{g}</h3>
          <Swatches tokens={pick(`${g}-`)} />
        </section>
      ))}
    </>
  ),
};

/** Raw palette. Reference these only from semantic tokens, not from components. */
export const Palette: Story = {
  render: () => <Swatches tokens={pick('color-').filter((n) => !n.includes('alpha'))} />,
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-4)' }}>
      {pick('type-')
        .filter((n) => /type-[0-9a-z]+-(default|emphasized)$/.test(n))
        .reverse()
        .map((t) => (
          <div key={t}>
            <code style={label}>{t}</code>
            <div style={{ font: vars[t] }}>Find your next gig</div>
          </div>
        ))}
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-2)' }}>
      {pick('space-').map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--bookd-space-3)' }}>
          <code style={{ ...label, width: 160 }}>{t}</code>
          <div style={{ height: 12, width: vars[t], background: 'var(--bookd-brand-base)', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  ),
};

export const RadiusAndShadow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-6)' }}>
      {[...pick('radius-'), ...pick('shadow-')].map((t) => (
        <div key={t} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 96,
              height: 96,
              background: 'var(--bookd-bg-white-0)',
              border: 'var(--bookd-border-width-1) solid var(--bookd-border-sub-200)',
              borderRadius: t.includes('radius') ? vars[t] : 'var(--bookd-radius-lg)',
              boxShadow: t.includes('shadow') ? vars[t] : undefined,
            }}
          />
          <code style={label}>{t}</code>
        </div>
      ))}
    </div>
  ),
};
