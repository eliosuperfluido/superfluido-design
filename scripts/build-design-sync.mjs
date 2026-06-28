// Build the claude.ai/design upload bundle for @superfluido/design.
//
// This design system ships no React components — it is a Tailwind v4 token +
// utility layer (index.css). The upload is the styling closure: a compiled
// static stylesheet plus an empty-bodied JS bundle (the claude.ai/design
// self-check still expects _ds_bundle.js + styles.css).
//
// This is the CANONICAL source for the design system across all Superfluido
// repos, so the bundle is generated from a safelist of the published token
// utilities (there is no single app to scan) rather than one consumer's usage.
//
// Run:     npm run design-sync      (or: node scripts/build-design-sync.mjs)
// Output:  ds-bundle/               (gitignored; re-create any time)

import { compile } from '@tailwindcss/node';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = `${repo}/ds-bundle`;
const GLOBAL = 'SuperfluidoDesign';

// ── 1. Compile the design tokens/utilities to static CSS ───────────────────
const input = `@import "tailwindcss";\n@import "${repo}/index.css";\n`;
const { build } = await compile(input, { base: repo, onDependency: () => {} });

// Safelist = the design system's published token-derived utilities. Tailwind
// tree-shakes unused utilities, so without this the published API wouldn't ship.
// Keep in sync with the tokens in index.css.
const textColors = ['text-primary', 'text-secondary', 'text-muted', 'text-dim', 'text-accent'];
const safelist = [
  // --color-text-* group  →  text-text-* / bg-text-* / border-text-*
  ...textColors.flatMap((c) => [`text-${c}`, `bg-${c}`, `border-${c}`]),
  // --color-accent (per-repo brand accent) → text/bg/border/ring/outline-accent
  'text-accent', 'bg-accent', 'border-accent', 'ring-accent', 'outline-accent',
  'font-display', 'font-grotesk', 'font-inter', 'font-mono',
  'tracking-heading',
  'ease-micro',
  'animate-rotate-cube', 'animate-pulse-ring', 'animate-scan-line', 'animate-fade-up',
];
const css = build([...new Set(safelist)]);

// ── 2. Assemble the upload bundle ──────────────────────────────────────────
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

writeFileSync(`${out}/_ds_bundle.css`, css);

const header = JSON.stringify({
  namespace: GLOBAL,
  components: [],
  sourceHashes: {},
  inlinedExternals: [],
  builtBy: 'cc-design-sync',
}).replace(/\*\//g, '*\\/');
writeFileSync(
  `${out}/_ds_bundle.js`,
  `/* @ds-bundle: ${header} */\n` +
    `"use strict";\nvar ${GLOBAL}=(()=>({}))();\n` +
    `if(typeof window!=="undefined"){window.${GLOBAL}=${GLOBAL};}\n`,
);

writeFileSync(`${out}/styles.css`, '@import "./_ds_bundle.css";\n');
writeFileSync(`${out}/README.md`, readFileSync(`${repo}/.design-sync/conventions.md`, 'utf8'));
writeFileSync(`${out}/_ds_needs_recompile`, '{"by":"design-sync-cli"}');

console.error(
  `ds-bundle/ built: _ds_bundle.css (${(css.length / 1024).toFixed(0)} KB), ` +
    `_ds_bundle.js, styles.css, README.md, _ds_needs_recompile`,
);
