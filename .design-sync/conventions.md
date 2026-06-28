# Superfluido Design System

A **Tailwind v4 token + utility layer** — colors, fonts, motion, and a handful
of bespoke utility classes. There are **no React components** in this design
system: you build your own markup and style it with these tokens and classes.
Styling is delivered as plain CSS (`styles.css`), so every utility and token
below resolves with no build step on your side.

This is the **shared** design system across all Superfluido repos. Everything is
identical between repos **except the brand accent**, which each repo overrides.

## Setup

- **Dark canvas by design.** The system sets `color-scheme: dark` and its colors
  are tuned for a near-black background (`#0a0a0a`). Put your UI on a dark
  surface or it will look wrong.
- No provider/wrapper component — just ensure `styles.css` is loaded.
- In a Tailwind v4 project: `@import "tailwindcss";` then `@import "@superfluido/design";`.
- Fonts (Geist, JetBrains Mono) are **self-hosted** in the package — no CDN.

## The per-repo accent

Every repo shares the tokens below **except `--color-accent`**. Override it once,
after the import, and every `accent` utility repoints:

```css
@import "tailwindcss";
@import "@superfluido/design";
@theme { --color-accent: #C8B89A; }   /* this repo's brand accent */
```

Default accent is `#ffffff` (monochrome). It drives `text-accent` / `bg-accent` /
`border-accent`, plus the focus ring on `btn-micro`, the `text-gradient-accent`
start color, and the `cursor-blink` color.

## Styling idiom — Tailwind utilities + named tokens

Style with Tailwind utility classes generated from the design tokens. **Use
these token names, do not invent your own.**

### Colors (each available as `text-*`, `bg-*`, `border-*`)

| Token | Value | Use |
|---|---|---|
| `primary` | `#d4d4d4` | body text |
| `secondary` | `#a3a3a3` | secondary text |
| `muted` | `#737373` | muted / captions |
| `dim` | `#505050` | dimmest labels / hairlines |
| `accent` | per-repo (default `#ffffff`) | **brand accent** |

e.g. `text-primary`, `bg-dim`, `border-accent`. Pure white when needed: `text-white`.

### Fonts

| Class | Family |
|---|---|
| `font-display` | **Geist** (display / headings) |
| `font-mono` | **JetBrains Mono** (mono / technical / body) |

### Tracking & easing

- `tracking-heading` — `-0.02em`, for headings.
- `ease-micro` — the house easing curve (`cubic-bezier(.25,.46,.45,.94)`).

### Motion

| Class | Effect |
|---|---|
| `animate-fade-up` | fade + rise in (entrance) |
| `animate-rotate-cube` | continuous 3D cube rotation |
| `animate-pulse-ring` | expanding pulse ring |
| `animate-scan-line` | vertical scan-line sweep |

## Bespoke utility classes (plain CSS, not Tailwind)

- `btn-micro` — button micro-interaction: hover scale-up, active press, accent focus ring.
- `link-micro` — link hover lift.
- `text-gradient-accent` — accent→grey gradient clipped to text (use on a heading).
- `noise-overlay` — fixed full-screen film-grain overlay (low opacity).
- `cursor-blink` — blinking terminal caret (inline block, accent colored).
- `protocol-card` — `will-change` hint for scroll-stacked cards.
- 3D wireframe cube: wrap a `cube` (six `cube-face` elements `face-front` /
  `face-back` / `face-left` / `face-right` / `face-top` / `face-bottom`) in a `cube-scene`.
- `ring` — absolutely-positioned concentric ring (size it yourself).

## Brand logos

Monochrome marks, rendered as **currentColor masks** — set colour with
`color`/`text-*` and size with `height` (width follows automatically):

| Class | Mark | Use | Aspect |
|---|---|---|---|
| `logo-superfluido` | Superfluido — full maze | **≥ 32px** (headers, hero) | 1:1 |
| `logo-superfluido-mark` | Superfluido — S-in-circle | **< 32px** (favicons, tight nav) | 1:1 |
| `logo-varc` | V-ARC | any size | ~1024:887 |

**Size rule:** the full Superfluido maze turns to mush below ~32px — use
`logo-superfluido-mark` (the simplified S-in-circle) at small sizes instead.
V-ARC's fractal holds up at any size.

```jsx
<span className="logo-superfluido text-accent" style={{ height: "2.5rem" }} />   {/* large */}
<span className="logo-superfluido-mark" style={{ height: "20px" }} />            {/* small */}
```

They inherit the accent like any colour utility (gold on productions, white
elsewhere). Raw SVGs ship at
`@superfluido/design/assets/{superfluido,superfluido-mark,v-arc}.svg` for direct
`<img>`/inline/favicon use.

## Where the truth lives

Read `styles.css` (and the `_ds_bundle.css` it imports) for the exact token
values and class definitions before styling.

## Example

```jsx
<section className="font-mono">
  <h1 className="font-display tracking-heading text-accent text-5xl animate-fade-up">
    Superfluido
  </h1>
  <p className="text-secondary mt-4">
    System online<span className="cursor-blink" />
  </p>
  <button className="btn-micro border border-accent text-accent px-5 py-2 mt-6">
    Get started
  </button>
</section>
```
