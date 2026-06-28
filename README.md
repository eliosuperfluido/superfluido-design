# @superfluido/design

Superfluido's **shared design system** — Tailwind v4 tokens, utilities, and base
styles. Used across all Superfluido repos (`superfluido-ai-landing`,
`superfluido-productions-landing`, `superfluido-ai-app`). Everything is shared
**except the brand accent**, which each repo overrides.

## Install (git dependency)

```jsonc
// package.json
"dependencies": {
  "@superfluido/design": "github:eliosuperfluido/superfluido-design#v1"
}
```

## Use

In your Tailwind v4 CSS entry:

```css
@import "tailwindcss";
@import "@superfluido/design";

/* This repo's brand accent (omit to keep the default monochrome white) */
@theme { --color-accent: #C8B89A; }
```

That gives you the shared tokens and utilities (`text-primary`, `font-display`,
`font-mono`, `animate-fade-up`, `btn-micro`, …) with this repo's accent applied
to every `accent` utility. Fonts (Geist, JetBrains Mono) are self-hosted.

## Tokens & vocabulary

See [`.design-sync/conventions.md`](./.design-sync/conventions.md) for the full
token/utility reference, or read [`index.css`](./index.css) directly.

## Claude Design

This design system is synced to Claude Design (claude.ai/design) so the design
agent builds on-brand in any Superfluido repo. To re-sync after changing tokens:

```sh
npm install
npm run design-sync   # builds ds-bundle/, then upload via the /design-sync skill
```
