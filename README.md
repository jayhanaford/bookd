# Bookd

Local-first booking platform for musicians and venues. This repo holds the Bookd
web app and its design system (React + TypeScript + Vite, documented in Storybook).

Bookd is fully independent: it has its own tokens (`--bookd-*`), its own
components and its own Storybook on **port 6007**. It imports nothing from any
other design system.

## Getting started

```bash
nvm use            # Node 22
npm install        # also builds the design tokens
npm run dev        # app at http://localhost:5173
npm run storybook  # design system at http://localhost:6007
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server for the app |
| `npm run storybook` | Storybook on port 6007 |
| `npm run tokens` | Rebuild tokens from `/tokens` (runs automatically before dev/build/storybook) |
| `npm run build` | Type-check and build the app |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |
| `npm run test:stories` | Run every story as a browser test (render, play functions, a11y) |
| `npm run lint` | oxlint |

`test:stories` needs a Chromium for Playwright. Run `npx playwright install chromium`
once, or point `PLAYWRIGHT_CHROMIUM_PATH` at an existing Chromium binary.

## Design tokens

```
tokens/
  primitives/foundations.json   palette, spacing, radius, borders, icon sizes,
                                shadows, blur, typography
  themes/light.json             semantic colors, light
  themes/dark.json              semantic colors, dark
scripts/build-tokens.mjs        Style Dictionary build
src/tokens/generated/           output (git-ignored): CSS variables + typed `vars` map
```

- Tokens are [DTCG](https://www.designtokens.org/) JSON, seeded from the
  [Bookd Design System Figma file](https://www.figma.com/design/L6RRUOTmxOQwLOR6XgYmHR/Bookd---Design-System.?node-id=10-597)
  (collections *Foundations*, *Color Tokens* Light/Dark, *Typography*, plus effect styles).
- The current values are the Figma starter kit's foundation. They will change as
  Bookd's visual direction is defined; edit the JSON and everything downstream updates.
- **Use semantic tokens in components** (`--bookd-bg-*`, `--bookd-text-*`, `--bookd-fg-*`,
  `--bookd-border-*`, `--bookd-brand-*`, `--bookd-state-*`). Palette tokens
  (`--bookd-color-*`) exist for semantic tokens to reference.
- Typography styles are font shorthands: `font: var(--bookd-type-base-emphasized)`.
- Theme with `data-bookd-theme="light" | "dark"` on `<html>` or any subtree
  (`setTheme()` from `src/tokens`). Storybook has a Theme toolbar.
- In TypeScript, `vars['bookd-brand-base']` gives `'var(--bookd-brand-base)'` with autocomplete.

## Structure

```
src/
  components/   Bookd components, one folder each (component, CSS module, stories)
  docs/         Storybook docs and foundation stories
  styles/       global CSS
  tokens/       token entry points (CSS + TS)
```
