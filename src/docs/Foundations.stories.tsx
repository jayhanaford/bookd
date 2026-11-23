import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { vars, type BookdToken } from '../tokens';
import { Button } from '../components/Button';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;
export default meta;
type Story = StoryObj;

const names = Object.keys(vars) as BookdToken[];
const pick = (prefix: string) => names.filter((n) => n.startsWith(`bookd-${prefix}`));

const label: CSSProperties = { font: 'var(--bookd-type-caption)', color: 'var(--bookd-text-secondary)' };
const h3: CSSProperties = { font: 'var(--bookd-type-h3)', margin: '0 0 var(--bookd-space-3)' };

function Swatches({ tokens }: { tokens: BookdToken[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: 'var(--bookd-space-3)' }}>
      {tokens.map((t) => (
        <div key={t}>
          <div
            style={{
              height: 48,
              borderRadius: 'var(--bookd-radius-sm)',
              background: vars[t],
              border: 'var(--bookd-border-width-1) solid var(--bookd-border-subtle)',
            }}
          />
          <code style={label}>{t}</code>
        </div>
      ))}
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ marginBottom: 'var(--bookd-space-8)' }}>
    <h3 style={h3}>{title}</h3>
    {children}
  </section>
);

/** Semantic colors switch with the Theme toolbar. Build UI from these. */
export const SemanticColors: Story = {
  render: () => (
    <>
      {['bg', 'text', 'border', 'action', 'focus', 'status'].map((g) => (
        <Section key={g} title={g}>
          <Swatches tokens={pick(`${g}-`)} />
        </Section>
      ))}
    </>
  ),
};

/** Raw Gradient Ticket palette. Only semantic tokens reference these. */
export const Palette: Story = {
  render: () => <Swatches tokens={pick('color-')} />,
};

/** Gradients are a signature, not a default: primary CTA, soft highlight, photo scrim. */
export const Gradients: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--bookd-space-4)' }}>
      {pick('gradient-').map((t) => (
        <div key={t}>
          <div
            style={{
              height: 88,
              borderRadius: 'var(--bookd-radius-lg)',
              background: t.includes('scrim') ? `${vars[t]}, var(--bookd-gradient-action-primary)` : vars[t],
            }}
          />
          <code style={label}>{t}</code>
        </div>
      ))}
    </div>
  ),
};

const typeSpecs: Record<string, string> = {
  display: 'Plus Jakarta Sans 32/38 700',
  h1: 'Plus Jakarta Sans 28/34 700',
  h2: 'Plus Jakarta Sans 22/28 700',
  h3: 'Plus Jakarta Sans 18/24 600',
  body: 'Inter 16/24 400',
  'body-strong': 'Inter 16/24 600',
  secondary: 'Inter 14/20 400',
  label: 'Inter 14/20 600',
  caption: 'Inter 12/16 500',
  button: 'Plus Jakarta Sans 16/24 700',
  'button-sm': 'Plus Jakarta Sans 14/20 700',
};

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-5)' }}>
      {Object.entries(typeSpecs).map(([role, spec]) => {
        const t = `bookd-type-${role}` as BookdToken;
        return (
          <div key={role}>
            <code style={label}>
              {t} · {spec}
            </code>
            <div style={{ font: vars[t] }}>The Bowery Room has an open slot Friday</div>
          </div>
        );
      })}
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--bookd-space-2)' }}>
      {pick('space-').map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--bookd-space-3)' }}>
          <code style={{ ...label, width: 160 }}>{t}</code>
          <div style={{ height: 12, width: vars[t], background: 'var(--bookd-action-primary-fallback)', borderRadius: 2 }} />
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
              background: 'var(--bookd-bg-card)',
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

const statuses = [
  ['confirmed', 'Confirmed'],
  ['pending', 'Pending'],
  ['declined', 'Declined'],
  ['open', 'Open gig'],
  ['unknown', 'Booking unknown'],
] as const;

/**
 * Dark shell with a white card, the core Gradient Ticket composition. The card is a
 * light-theme island (`data-bookd-theme="light"`), so text, accent and focus tokens
 * invert inside it. Fictional demo content.
 */
export const ShellAndCard: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <div style={{ maxWidth: 390, display: 'grid', gap: 'var(--bookd-space-4)' }}>
      <div>
        <div style={{ font: 'var(--bookd-type-label)', color: 'var(--bookd-text-accent)' }}>Local Pulse</div>
        <div style={{ font: 'var(--bookd-type-h1)' }}>Portland</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ font: 'var(--bookd-type-h2)' }}>Nearby venues</span>
        <span style={{ font: 'var(--bookd-type-label)', color: 'var(--bookd-text-accent)' }}>View all</span>
      </div>
      <article
        data-bookd-theme="light"
        style={{
          background: 'var(--bookd-bg-card)',
          color: 'var(--bookd-text-primary)',
          border: 'var(--bookd-border-width-1) solid var(--bookd-border-card)',
          borderRadius: 'var(--bookd-radius-xl)',
          padding: 'var(--bookd-space-3)',
          display: 'grid',
          gap: 'var(--bookd-space-3)',
        }}
      >
        <div
          role="img"
          aria-label="Venue photo placeholder"
          style={{
            height: 140,
            borderRadius: 'var(--bookd-radius-lg)',
            background: 'var(--bookd-gradient-media-scrim), var(--bookd-gradient-action-primary)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'var(--bookd-space-3)',
            color: 'var(--bookd-color-white)',
            font: 'var(--bookd-type-label)',
          }}
        >
          Example Hall · 0.8 mi
        </div>
        <div style={{ padding: '0 var(--bookd-space-1)' }}>
          <div style={{ font: 'var(--bookd-type-h3)' }}>Example Hall</div>
          <div style={{ font: 'var(--bookd-type-secondary)', color: 'var(--bookd-text-secondary)' }}>
            Southeast Portland · 250 cap
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--bookd-space-2)' }}>
          {statuses.map(([key, text]) => (
            <span
              key={key}
              style={{
                font: 'var(--bookd-type-caption)',
                color: `var(--bookd-status-${key}-fg)`,
                background: `var(--bookd-status-${key}-bg)`,
                borderRadius: 'var(--bookd-radius-pill)',
                padding: 'var(--bookd-space-1) var(--bookd-space-2-5)',
              }}
            >
              {text}
            </span>
          ))}
        </div>
        <Button fullWidth>View open opportunities</Button>
      </article>
      <Button variant="secondary" fullWidth>
        Message venue
      </Button>
    </div>
  ),
};
