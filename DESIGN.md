---
name: Tuong Luu Portfolio
description: Sparse, technical, and personal UI system for a developer portfolio.
colors:
  signal-paper-light: 'oklch(1 0 0)'
  signal-ink-light: 'oklch(0.145 0 0)'
  signal-surface-light: 'oklch(0.97 0 0)'
  signal-quiet-light: 'oklch(0.556 0 0)'
  signal-line-light: 'oklch(0.922 0 0)'
  signal-focus-light: 'oklch(0.708 0 0)'
  signal-paper-dark: 'oklch(0.145 0 0)'
  signal-ink-dark: 'oklch(0.985 0 0)'
  signal-surface-dark: 'oklch(0.269 0 0)'
  signal-quiet-dark: 'oklch(0.708 0 0)'
  signal-line-dark: 'oklch(1 0 0 / 10%)'
  signal-focus-dark: 'oklch(0.556 0 0)'
  status-danger-light: 'oklch(0.577 0.245 27.325)'
  status-danger-dark: 'oklch(0.704 0.191 22.216)'
typography:
  display:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 'normal'
  headline:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 'normal'
  title:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 'normal'
  body:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 'normal'
  label:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 'normal'
  accent:
    fontFamily: '"Caveat", "Bradley Hand", cursive'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 'normal'
rounded:
  sm: '6px'
  md: '8px'
  lg: '10px'
  xl: '14px'
spacing:
  xs: '8px'
  sm: '12px'
  md: '16px'
  lg: '24px'
  xl: '32px'
components:
  button-primary:
    backgroundColor: '{colors.signal-ink-light}'
    textColor: '{colors.signal-paper-light}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '0 16px'
    height: '36px'
  button-outline:
    backgroundColor: '{colors.signal-paper-light}'
    textColor: '{colors.signal-ink-light}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '0 16px'
    height: '36px'
  input-default:
    backgroundColor: '{colors.signal-paper-light}'
    textColor: '{colors.signal-ink-light}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    padding: '0 12px'
    height: '36px'
  card-default:
    backgroundColor: '{colors.signal-paper-light}'
    textColor: '{colors.signal-ink-light}'
    rounded: '{rounded.xl}'
    padding: '24px'
  chip-tech:
    backgroundColor: '{colors.signal-surface-light}'
    textColor: '{colors.signal-ink-light}'
    typography: '{typography.label}'
    rounded: '{rounded.lg}'
    padding: '8px 12px'
  nav-link:
    backgroundColor: 'transparent'
    textColor: '{colors.signal-ink-light}'
    typography: '{typography.title}'
    rounded: '{rounded.md}'
    padding: '0 8px'
---

# Design System: Tuong Luu Portfolio

## Overview

**Creative North Star: "The Personal Terminal"**

This system treats the portfolio like a personal interface rather than a marketing campaign. The page should feel spare, direct, and technically literate, with enough authored detail to remind visitors that a person made it. The black-and-white structure is not neutrality for its own sake, it is a way to keep the work, the names, and the small interactions in the foreground.

The tone is minimal and technical, with small handwritten or kinetic details that make it feel authored. Typography carries most of the personality. Motion stays brief and useful. Color is almost entirely structural, then a playful detail lands harder because the rest of the screen stays quiet.

This system explicitly rejects anything generic, SaaS-like, template-heavy, corporate, or interchangeable with a startup landing page. It must not drift into polished-but-anonymous portfolio patterns or feel like a product marketing surface disguised as a personal portfolio.

**Key Characteristics:**

- Sparse layout with high-signal content
- Monochrome structure with rare authored accents
- Technical credibility without developer-costume gimmicks
- Playful details used as signatures, not decorations
- Theme inversion that preserves the same identity in light and dark

## Colors

The palette is a near-monochrome system built from inversions: light mode uses paper and ink, dark mode flips the same relationship, and saturation appears only when state or personality genuinely requires it.

### Primary

- **Signal Ink / Signal Paper** (`oklch(0.145 0 0)` in light mode, `oklch(0.985 0 0)` in dark mode): This is the main contrast pair. It fills primary buttons, draws active emphasis, carries icons and rules, and establishes the portfolio's technical bluntness without becoming harsh.

### Neutral

- **Paper Field** (`oklch(1 0 0)` in light mode, `oklch(0.145 0 0)` in dark mode): The default page field. It should stay clean and quiet so content density, not decoration, defines hierarchy.
- **Soft Surface** (`oklch(0.97 0 0)` in light mode, `oklch(0.269 0 0)` in dark mode): Used for muted fills, chips, tabs, resume framing, and other secondary surfaces that need separation without announcing themselves.
- **Quiet Text** (`oklch(0.556 0 0)` in light mode, `oklch(0.708 0 0)` in dark mode): Metadata, supporting labels, timestamps, secondary copy. It softens the interface without reducing legibility.
- **Line Work** (`oklch(0.922 0 0)` in light mode, `oklch(1 0 0 / 10%)` in dark mode): Hairline borders, separators, panel edges, and input outlines. These lines structure the page, they do not decorate it.
- **Focus Halo** (`oklch(0.708 0 0)` in light mode, `oklch(0.556 0 0)` in dark mode): Reserved for focus rings and interactive confirmation.

### Tertiary

- **Danger State** (`oklch(0.577 0.245 27.325)` in light mode, `oklch(0.704 0.191 22.216)` in dark mode): Error and destructive messaging only. It should never be repurposed as personality color.

**The Monochrome Inversion Rule.** Light and dark mode are the same identity in reverse. Do not invent separate personalities for each theme.

**The Rare Accent Rule.** Saturated color is reserved for meaning, status, or one-off authored details. If a screen starts looking colorful by default, the system has drifted.

## Typography

**Display Font:** Bricolage Grotesque (fallback: `system-ui, sans-serif`)
**Body Font:** Bricolage Grotesque (fallback: `system-ui, sans-serif`)
**Label/Mono Font:** Caveat for handwritten accents only (fallback: `Bradley Hand, cursive`)

**Character:** The voice is carried almost entirely by one assertive sans family, then softened with a handwritten accent when a moment needs personality. This keeps the interface technical and controlled while avoiding the deadpan feel of a pure utilitarian system.

### Hierarchy

- **Display** (`600`, `1.5rem`, `1.2`): Page names, section titles, and the few lines that need to announce themselves without becoming hero copy.
- **Headline** (`600`, `1.25rem`, `1.3`): Prominent module headings, named areas, and high-priority labels such as the site owner's name.
- **Title** (`600`, `1.125rem`, `1.35`): Project titles, accordion triggers, navigation language, and other interface copy that needs clear presence.
- **Body** (`400`, `1rem`, `1.55`): General reading copy, project detail text, contact helper copy, and bullet content. Longer passages should stay within `65ch`.
- **Label** (`500`, `0.875rem`, `1.4`): Buttons, chips, timestamps, form labels, and compact navigation language.
- **Accent** (`400`, `1rem`, `1.2`): Handwritten notes or signatures only. This is a human trace, not a second full type system.

**The Single-System Rule.** Bricolage Grotesque carries the interface. Caveat appears only when a moment benefits from a visible human hand.

## Elevation

This system is mostly flat, with lifted moments for interactive surfaces. Depth is communicated through borders, tonal shifts, and restrained framework shadows rather than glossy layering. The overall read should stay crisp and planar.

### Shadow Vocabulary

- **Utility Lift** (small, low-opacity ambient shadow on cards, inputs, menus, and dialogs): Used only to separate interactive surfaces from the page field. The shadow must stay soft enough that the border still does most of the work.
- **Live Pulse Glow** (`0 0 8px 2px rgba(34, 197, 94, 0.8)`): Reserved for the live project indicator. This is a status signal and a playful signature at the same time.

**The Utility Shadow Rule.** Shadows explain layer and state. They do not create atmosphere.

## Components

Every component should feel like it belongs to the same restrained terminal-like surface. Rounded corners are present, but they stay modest. Borders, spacing, and type weight do the majority of the styling work.

### Buttons

- **Shape:** Gently curved edges (`8px` default, `36px` tall standard button, `32px` or `40px` for compact and large variants).
- **Primary:** Filled with Signal Ink over Signal Paper in the active theme pair, medium label weight, compact horizontal padding (`16px` default, `24px` large).
- **Hover / Focus:** Hover only softens or tints the fill. Focus uses a visible `3px` halo. Movement, if any, is minimal.
- **Secondary / Ghost / Outline:** Outline buttons rely on a quiet border and paper field. Ghost buttons stay transparent until hover. Link buttons underline on interaction instead of pretending to be filled controls.

### Chips

- **Style:** Soft Surface background with Signal Ink text, rounded corners (`10px`), compact padding (`8px`), and optional small icons.
- **State:** Chips are descriptive tags, not loud badges. They should read like technical labels attached to real work.

### Cards / Containers

- **Corner Style:** Soft but controlled corners (`14px` for cards, `10px` for framed media blocks).
- **Background:** Paper or panel tone, depending on the active theme.
- **Shadow Strategy:** Flat first, with only a utility lift when the surface needs separation.
- **Border:** Hairline border in Line Work. The border should stay visible even when a shadow is present.
- **Internal Padding:** `24px` on primary cards, with tighter internal groupings nested inside.

### Inputs / Fields

- **Style:** Base primitives use a quiet border, transparent fill, `8px` radius, and compact horizontal padding (`12px`).
- **Focus:** A `3px` Focus Halo confirms interactivity. The border becomes more explicit, but the field should still feel spare.
- **Error / Disabled:** Error state uses Danger State only for validation. Disabled state lowers opacity rather than inventing a new color.
- **Signature Variation:** The contact form strips fields down further into bottom-border lines with square corners. This is a deliberate reduction, not an unfinished state.

### Navigation

- **Style:** Lowercase route language, semibold sizing, no chrome-heavy shell.
- **Default / Hover / Active:** Default state is plain text. Hover reveals a short underline animation. Active state uses underline rather than pills, tabs, or heavy fills.
- **Mobile Treatment:** Desktop stays open and linear. Mobile collapses into a compact dropdown without changing the underlying tone.

### Timeline Accordion

- **Style:** The accordion reads like a technical ledger: direct titles, supporting metadata, and a hover tint rather than a decorative container.
- **State:** Hover uses a faint surface tint. Open state reveals detail without transforming the whole row into a card.

## Do's and Don'ts

### Do:

- **Do** preserve sparse layouts and let concise content, rules, and spacing carry the hierarchy.
- **Do** keep the palette almost monochrome and let light/dark inversion do the heavy lifting.
- **Do** use playful details selectively, especially in handwritten accents, small motion, and live-state signals.
- **Do** make buttons, links, and focus states feel direct and keyboard-friendly instead of ornamental.
- **Do** keep cards, chips, and framed surfaces restrained enough that the work itself stays primary.

### Don't:

- **Don't** make this generic, SaaS-like, template-heavy, corporate, or interchangeable with a startup landing page.
- **Don't** drift into polished-but-anonymous portfolio patterns or make this feel like a product marketing surface disguised as a personal portfolio.
- **Don't** add hero metrics, identical card grids, glassy panels, or decorative gradient text.
- **Don't** use color as filler. If a bright accent is not carrying meaning, state, or authored personality, remove it.
- **Don't** replace the current sparse, technical tone with editorial-magazine theatrics, developer-costume monospaces, or oversized marketing chrome.
