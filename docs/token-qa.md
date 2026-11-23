# Token QA: Gradient Ticket

**Date:** 2026-11-23
**Scope:** The Gradient Ticket palette, gradients, type and shape from the product handoff (section 9),
turned into Bookd's working tokens and checked against WCAG 2.2 AA in dark and light themes.
**Evidence status:** Implemented and measured. Contrast ratios are computed from the token
values (WCAG relative luminance). Nothing here has been tested with users yet.

Source values came from the Gradient Ticket concept board, which is a generated image, not an
audited spec. The board's hex labels were taken as the intended values.

## What changed and why

| # | Finding | Change | Why |
|---|---|---|---|
| 1 | White label on the gradient CTA (as drawn on the board) measures **3.50:1** on `#FF2E88` and **3.80:1** on `#C83BFF`. Fails AA for 16px button text. | CTA label is `text.on-action` = charcoal `#0B0B0F`: **5.61:1** and **5.17:1**. | Matches the handoff's proposal and the "updated primary palette" reference, which shows a dark label. |
| 2 | Board pink `#FF2E88` as accent text ("View all", "Local Pulse") is **5.61:1** on the canvas but **4.46:1** on the dark surface `#232329` and **3.50:1** on white cards. | Added `pink.400` `#FF5C9F` for accent text on dark (6.81:1 canvas, 5.42:1 surface) and `pink.700` `#B3134F` for accent text in white cards and the light theme (6.72:1 on white). | Keeps the pink voice while passing everywhere it appears. `pink.500` stays the brand and gradient color. |
| 3 | Hover and pressed gradients were not defined. A darker pressed state risks dropping the dark label below AA. | Hover: `pink.400 → purple.400` (6.81 / 6.87:1). Pressed: `pink.600` `#F0207C` → `purple.600` `#BC34F2` (4.87 / 4.59:1). | Every stop of every state is checked, since the label sits on the whole gradient. |
| 4 | Proposed borders (`gray.100` on white 1.20:1, `charcoal.700` on canvas 1.59:1) are fine as dividers but too faint for input edges. | Split borders: `border.subtle` for decorative dividers, new `border.control` = `gray.500` `#75757F` for inputs and controls (4.31:1 canvas, 3.43:1 surface, 4.56:1 white). | WCAG 1.4.11 needs 3:1 for control boundaries. |
| 5 | No light theme existed in the direction, which is dark-first. | Light theme: canvas `gray.50` `#F5F5F8` (new), white surfaces and cards with a `gray.200` `#D6D6DE` (new) edge, charcoal text, `pink.700` accent and focus. | Dark is the default; light is available and passes the same checks. |
| 6 | The handoff asks components not to assume every card is dark. | White cards are **light-theme islands** (`data-bookd-theme="light"`, or the Light mode on a Figma frame). Text, accent, outline and focus tokens invert inside them. | One set of semantic names works on the shell and in cards, instead of parallel `on-dark` / `on-light` token sets. |
| 7 | Focus indicator was not specified. | `focus.ring`: `pink.400` on dark (6.81:1 canvas, 5.42:1 surface), `pink.700` in cards and light (6.72:1 on white). 2px outline, 2px offset. | WCAG 2.4.7 / 1.4.11. |
| 8 | Status pairs proposed in the handoff. | Kept as proposed; all pass. Added `status.open` (pink.700 on lilac.100, 5.18:1) and `status.unknown` (gray.700 on gray.100, 8.04:1). | `open` reuses the brand tint so opportunities feel inviting; `unknown` is neutral so it never reads as a booking state. |
| 9 | Board radii. | `sm 8`, `md 12`, `lg 16`, `xl 24`, `pill 999`. Buttons use pill, as on the board. | Straight from the handoff proposal. |
| 10 | Type. | Plus Jakarta Sans for headings and buttons, Inter for body; styles display, h1, h2, h3, body, body-strong, secondary, label, caption, button, button-sm. | Handoff sizes kept. Added label, body-strong and button styles the board uses. |

Confirmed green on its fill (`#26794C` on `#DDF6E4`) passes at **4.69:1**, the tightest text pair in the
system. Don't lighten it.

## Not checked by ratio

- **Gradient as a signal:** the gradient never carries meaning alone; buttons have labels and statuses have text.
- **Text over photos:** `gradient.media.scrim` ends at 90% charcoal. Contrast depends on each photo, so check real images when they exist.
- **Disabled controls:** exempt from contrast minimums under WCAG; they use `bg.disabled` and `text.disabled`.
- **Display rendering:** saturated pink and purple vary by screen. Visual sign-off is Jay's.

## Full results

All 30 pairs pass in both themes. The live table is in Storybook at
**Foundations / Contrast QA**, and `npm run test:stories` fails if any pair drops below AA.

| Pair | Dark | Light |
|---|---|---|
| text.primary / bg.canvas | 19.64 | 18.05 |
| text.primary / bg.surface | 15.63 | 19.64 |
| text.secondary / bg.canvas | 8.14 | 8.85 |
| text.secondary / bg.surface | 6.48 | 9.63 |
| text.accent / bg.canvas | 6.81 | 6.18 |
| text.accent / bg.surface | 5.42 | 6.72 |
| text.on-action / gradient stops (6) | 4.59 to 6.87 | same |
| card: text.primary / text.secondary / text.accent on white | 19.64 / 9.63 / 6.72 | same |
| status fg / bg (5) | 4.69 to 8.04 | same |
| border.control / canvas, surface, card | 4.31 / 3.43 / 4.56 | 4.19 / 4.56 / 4.56 |
| focus.ring / canvas, surface, card | 6.81 / 5.42 / 6.72 | 6.18 / 6.72 / 6.72 |
| action.primary.fallback edge / canvas, card | 5.61 / 3.50 | 3.22 / 3.50 |
