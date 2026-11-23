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

Bookd uses the **Gradient Ticket** direction: near-black shell, white cards,
pink-to-magenta gradient CTAs, Plus Jakarta Sans headings and Inter body text.

```
tokens/
  primitives/foundations.json   palette, spacing, radius, borders, icon sizes,
                                shadows, blur, typography
  themes/dark.json              semantic colors and gradients, dark (default)
  themes/light.json             semantic colors and gradients, light
scripts/build-tokens.mjs        Style Dictionary build
src/tokens/generated/           output (git-ignored): CSS variables + typed `vars` map
docs/token-qa.md                contrast audit and every change made to the source values
```

- Tokens are [DTCG](https://www.designtokens.org/) JSON. The same names exist as
  variables in the [Bookd Design System Figma file](https://www.figma.com/design/L6RRUOTmxOQwLOR6XgYmHR/Bookd---Design-System.?node-id=10-597)
  (collections *Bookd Primitives* and *Bookd Semantic*, Dark and Light modes).
  The JSON is the source of truth; Figma is kept in step by hand.
- **Use semantic tokens in components** (`--bookd-bg-*`, `--bookd-text-*`,
  `--bookd-border-*`, `--bookd-action-*`, `--bookd-focus-*`, `--bookd-status-*`,
  `--bookd-gradient-*`). Palette tokens (`--bookd-color-*`) exist for semantic tokens
  to reference.
- Typography styles are role-based font shorthands: `font: var(--bookd-type-h2)`,
  `var(--bookd-type-body)`, `var(--bookd-type-button)` and so on.
- Dark is the default theme. Use `data-bookd-theme="light" | "dark"` on `<html>` or
  any subtree (`setTheme()` from `src/tokens`). Storybook has a Theme toolbar.
- **White cards are light islands:** add `data-bookd-theme="light"` to a white card
  on the dark shell so the tokens inside it invert.
- In TypeScript, `vars['bookd-text-accent']` gives `'var(--bookd-text-accent)'` with autocomplete.

## Components

| Storybook group | Components |
| --- | --- |
| Components / Actions | Button |
| Components / Inputs | SearchField, FilterChip |
| Components / Display | StatusBadge, GenreTag |
| Components / Cards | VenueCard (stacked, compact), OpportunityCard |
| Components / Booking | BookingSummaryTicket (ticket, compact) |

Import from `src/components`. White cards (VenueCard, OpportunityCard,
BookingSummaryTicket) set `data-bookd-theme="light"` on themselves, so they work on
the dark shell and in the light theme without extra props.

Rules the components follow:

- **Separate signals.** Booking process, venue availability and opportunity status are
  separate StatusBadge sets. Venue verification is its own flag on VenueCard, because
  a verified venue isn't necessarily booking.
- **Never color alone.** Every badge has an icon and text; selected chips add a check.
- **Gig pass, not admission ticket.** BookingSummaryTicket has no barcode, QR code or
  seat. Its notches and perforation are decorative CSS masks.
- **No fake photos.** `MediaPlaceholder` stands in until real, rights-cleared images exist.
- **Fictional demo data** lives in `src/demo/fixtures.ts` and every story that uses it
  says so on screen.
- Component stories run axe with `a11y.test: 'error'`, so an accessibility violation
  fails `npm run test:stories`.

## Structure

```
src/
  components/   Bookd components, one folder each (component, CSS module, stories)
  demo/         fictional demo data for stories and tests (labeled as such)
  lib/          small helpers (date formatting)
  docs/         Storybook docs and foundation stories
  styles/       global CSS
  tokens/       token entry points (CSS + TS)
```
