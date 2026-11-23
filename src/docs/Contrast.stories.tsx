import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Live WCAG 2.2 contrast check of Bookd's text and UI pairs, read from the
 * current CSS variables. Switch the Theme toolbar to audit light and dark.
 * "Card" rows are inside a light-theme island (a white card on the dark shell).
 */
const meta = {
  title: 'Foundations/Contrast QA',
  parameters: { layout: 'padded' },
} satisfies Meta;
export default meta;
type Story = StoryObj;

type Pair = { fg: string; bg: string; min: 4.5 | 3; use: string; card?: boolean };

const stops = ['pink-500', 'purple-500', 'pink-400', 'purple-400', 'pink-600', 'purple-600'];

const pairs: Pair[] = [
  { fg: 'text-primary', bg: 'bg-canvas', min: 4.5, use: 'Body text on shell' },
  { fg: 'text-primary', bg: 'bg-surface', min: 4.5, use: 'Body text on surface' },
  { fg: 'text-secondary', bg: 'bg-canvas', min: 4.5, use: 'Metadata on shell' },
  { fg: 'text-secondary', bg: 'bg-surface', min: 4.5, use: 'Metadata on surface' },
  { fg: 'text-accent', bg: 'bg-canvas', min: 4.5, use: 'Accent link on shell' },
  { fg: 'text-accent', bg: 'bg-surface', min: 4.5, use: 'Accent link on surface' },
  ...stops.map((s): Pair => ({ fg: 'text-on-action', bg: `color-${s}`, min: 4.5, use: `CTA label on gradient stop ${s}` })),
  { fg: 'text-primary', bg: 'bg-card', min: 4.5, use: 'Title in card', card: true },
  { fg: 'text-secondary', bg: 'bg-card', min: 4.5, use: 'Details in card', card: true },
  { fg: 'text-secondary', bg: 'bg-card-muted', min: 4.5, use: 'Details in muted block', card: true },
  { fg: 'text-accent', bg: 'bg-card', min: 4.5, use: 'Accent link in card', card: true },
  ...['confirmed', 'pending', 'declined', 'open', 'unknown'].map(
    (s): Pair => ({ fg: `status-${s}-fg`, bg: `status-${s}-bg`, min: 4.5, use: `Status chip: ${s}` }),
  ),
  { fg: 'border-control', bg: 'bg-canvas', min: 3, use: 'Input boundary on shell' },
  { fg: 'border-control', bg: 'bg-surface', min: 3, use: 'Input boundary on surface' },
  { fg: 'border-control', bg: 'bg-card', min: 3, use: 'Input boundary in card', card: true },
  { fg: 'border-contrast', bg: 'bg-canvas', min: 3, use: 'Secondary button outline' },
  { fg: 'focus-ring', bg: 'bg-canvas', min: 3, use: 'Focus ring on shell' },
  { fg: 'focus-ring', bg: 'bg-surface', min: 3, use: 'Focus ring on surface' },
  { fg: 'focus-ring', bg: 'bg-card', min: 3, use: 'Focus ring in card', card: true },
  { fg: 'action-primary-fallback', bg: 'bg-canvas', min: 3, use: 'CTA edge on shell' },
  { fg: 'action-primary-fallback', bg: 'bg-card', min: 3, use: 'CTA edge in card', card: true },
];

const toRgb = (value: string): [number, number, number] | null => {
  const hex = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hex) return null;
  const full = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join('') : hex[1];
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const luminance = ([r, g, b]: [number, number, number]) => {
  const f = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: [number, number, number], b: [number, number, number]) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

type Row = Pair & { fgHex: string; bgHex: string; ratio: number };

function ContrastTable({ theme }: { theme: string }) {
  const shell = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Row[]>([]);

  useLayoutEffect(() => {
    const read = (el: HTMLElement, name: string) => getComputedStyle(el).getPropertyValue(`--bookd-${name}`).trim();
    setRows(
      pairs.map((p) => {
        const el = (p.card ? card.current : shell.current)!;
        const fgHex = read(el, p.fg);
        const bgHex = read(el, p.bg);
        const a = toRgb(fgHex);
        const b = toRgb(bgHex);
        return { ...p, fgHex, bgHex, ratio: a && b ? contrast(a, b) : 0 };
      }),
    );
  }, [theme]);

  const cell: CSSProperties = { padding: 'var(--bookd-space-2) var(--bookd-space-3)', borderBottom: 'var(--bookd-border-width-1) solid var(--bookd-border-subtle)', textAlign: 'left' };
  const failures = rows.filter((r) => r.ratio < r.min).length;

  return (
    <div ref={shell}>
      <div ref={card} data-bookd-theme="light" hidden />
      {rows.length > 0 && (
        <p style={{ font: 'var(--bookd-type-body-strong)' }} data-testid="summary">
          {rows.length} pairs checked in the {theme} theme: {failures === 0 ? 'all pass WCAG AA.' : `${failures} below AA.`}
        </p>
      )}
      <table style={{ borderCollapse: 'collapse', font: 'var(--bookd-type-secondary)', width: '100%' }}>
        <thead>
          <tr>
            {['Use', 'Foreground', 'Background', 'Ratio', 'Needs', 'Result'].map((h) => (
              <th key={h} style={{ ...cell, font: 'var(--bookd-type-label)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const pass = r.ratio >= r.min;
            return (
              <tr key={`${r.fg}-${r.bg}-${r.card}`}>
                <td style={cell}>{r.use}{r.card ? ' (card)' : ''}</td>
                <td style={cell}><code>{r.fg}</code> {r.fgHex}</td>
                <td style={cell}><code>{r.bg}</code> {r.bgHex}</td>
                <td style={cell}>
                  <span style={{ background: r.bgHex, color: r.fgHex, padding: '2px 8px', borderRadius: 6, marginRight: 8, font: 'var(--bookd-type-label)' }}>Aa</span>
                  {r.ratio.toFixed(2)}:1
                </td>
                <td style={cell}>{r.min}:1</td>
                <td style={{ ...cell, color: pass ? 'var(--bookd-text-primary)' : 'var(--bookd-text-accent)', font: 'var(--bookd-type-label)' }}>
                  {pass ? 'Pass' : 'Fail'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const checkAllPass: Story['play'] = async ({ canvas }) => {
  const summary = await canvas.findByTestId('summary');
  if (!/all pass/.test(summary.textContent ?? '')) throw new Error(summary.textContent ?? 'contrast check failed');
};

/** Follows the Theme toolbar. */
export const AllPairs: Story = {
  render: (_args, { globals }) => <ContrastTable key={globals.theme} theme={globals.theme ?? 'dark'} />,
  play: checkAllPass,
};

/** Pinned to dark and light so `npm run test:stories` fails if any pair drops below AA. */
export const DarkTheme: Story = { ...AllPairs, globals: { theme: 'dark' } };
export const LightTheme: Story = { ...AllPairs, globals: { theme: 'light' } };
