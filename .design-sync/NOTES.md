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

## Re-sync risks (watch-list)

- **Safelist drift**: new tokens in `index.css` need matching safelist entries in
  `build-design-sync.mjs`, or their utilities silently won't ship.
- **`font-inter` is a monospace stack** (legacy naming). Documented honestly in
  conventions.md — don't "fix" the header without fixing the source token.
- **Accent**: the Claude Design bundle ships the DEFAULT accent (white). Per-repo
  accents live in the consumer repos, not here.
- **Dark canvas assumption**: tokens are tuned for `#0a0a0a`.
- **No nested `/* */` in `index.css` comments.** CSS comments don't nest — an
  inner `*/` closes the block early and silently voids the entire `@theme`
  (utilities stop generating while vars still emit, so it's easy to miss). The
  big header comment uses `<- like this` instead of inline `/* */` examples.
