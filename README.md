# Claude Avatar Picker

Browse all 72 built-in claude.ai profile avatars and copy a one-line console command to apply any of them to your account.

🔗 **[pyyupsk.github.io/claude-avatar-picker](https://pyyupsk.github.io/claude-avatar-picker/)**

## What is this?

claude.ai stores your profile picture as an integer id (the `avatar` field on `/api/account_profile`). The web app maps each id to a designed SVG client-side. The id space contains **72 unique designs** — but the picker UI only shows a handful at random when you click "Randomize avatar".

This site shows them all, lets you pick one, and gives you a console snippet that:

1. Walks the React fiber tree to find the React Query `QueryClient`.
2. Issues `PUT /api/account_profile` with your chosen id.
3. Calls `qc.invalidateQueries()` so the avatar updates instantly without a reload.

## How to use

1. Open the site, pick an avatar.
2. Copy the snippet (raw or Discord-formatted).
3. Open claude.ai, paste in DevTools console, hit enter.

That's it.

## Notes

- `id = 0` clears the avatar (renders initials).
- `id = 1..72` renders one of the 72 designs.
- The server stores any integer; ids outside `1..72` render as a blank circle.
- Last verified against claude.ai on 2026-04-30.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 with semantic tokens
- Biome (lint + format)
- prism-react-renderer (syntax highlighting)
- System-aware theme (light / dark / system) with no flash on reload
- Bun as runtime and package manager

## Develop

```sh
bun install
bun dev          # vite dev server
bun run check    # biome check
bun run typecheck
bun run build
```

## Deploy

GitHub Actions builds on every push to `main` and publishes to GitHub Pages.

## License

MIT
