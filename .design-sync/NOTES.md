# design-sync notes — @superfluido/design (standalone)

## What this repo is

The canonical, **shared** Superfluido design system: a Tailwind v4 token +
utility layer (`index.css`). No React components. Consumed by every Superfluido
repo as a **git dependency** (`github:eliosuperfluido/superfluido-design#v1`).

Consumers: `superfluido-ai-landing`, `superfluido-productions-landing`,
`superfluido-ai-app`. Everything is shared except the brand accent
(`--color-accent`), which each repo overrides in its own CSS after the import.

## Claude Design sync

`scripts/build-design-sync.mjs` produces the upload bundle (`ds-bundle/`). The
bundled design-sync converter (`package-build.mjs`) is NOT used — it errors with
`[ZERO_MATCH]` on a zero-component package.

`index.css` is Tailwind v4 source (`@theme {}`), which browsers don't understand
raw, so the script **compiles** it via `@tailwindcss/node`. Since this is the
canonical source (no single app to scan), utilities come from a **safelist** of
the published token utilities — keep the safelist in `build-design-sync.mjs` in
sync with the tokens in `index.css` when you add tokens.

Project: https://claude.ai/design/p/6a0e7e54-d566-4e98-884b-e5529b62b4f4

## Re-sync (one command)

```sh
npm install          # first time / fresh clone
npm run design-sync  # builds ds-bundle/
```

Then upload `ds-bundle/` to the Claude Design project (see /design-sync skill,
upload section). No `_ds_sync.json` anchor is written (off-script layout) — re-syncs
re-verify from scratch, trivial here since there are no components.

## Token scheme (clean, v1.1)

Colors use single-word names: `--color-{primary,secondary,muted,dim,accent}` →
`text-primary`/`bg-primary`/`border-primary` etc. (NOT the old `--color-text-*` /
`text-text-*`). Fonts: `--font-display` = Geist, `--font-mono` = JetBrains Mono.
Dropped `--font-grotesk` and `--font-inter` (unused, the latter was a mis-named
mono alias).

## Fonts (self-hosted)

Geist (400/500/600/700) and JetBrains Mono (400/500/700) ship as woff2 in
`fonts/`, wired via `@font-face` in `index.css` with relative `url("./fonts/…")`.
No Google CDN (GDPR — Swiss/EU sites). `package.json` `files` includes `fonts`.
The design-sync build copies `fonts/` into `ds-bundle/` so the `@font-face` urls
resolve in the Claude Design upload (add `fonts/**` to the upload plan writes).

To add weights/families: drop the woff2 in `fonts/`, add an `@font-face`, update
the family stack token. Source: `@fontsource/<family>` on jsDelivr.

## Re-sync risks (watch-list)

- **Safelist drift**: new tokens in `index.css` need matching safelist entries in
  `build-design-sync.mjs`, or their utilities silently won't ship.
- **No nested `/* */` in `index.css` comments.** CSS comments don't nest — an
  inner `*/` closes the block early and silently voids the entire `@theme`.
- **Accent**: the Claude Design bundle ships the DEFAULT accent (white). Per-repo
  accents live in the consumer repos, not here.
- **Dark canvas assumption**: tokens are tuned for `#0a0a0a`.
- **Font files are binary in git.** ~200 KB total; fine, but keep weights lean.
