# Repository Guidelines

## Project Structure & Module Organization

This repo is a Next.js 16 App Router portfolio. Application routes live in `src/app`, including page routes such as `src/app/projects`, `src/app/contact`, and API handlers under `src/app/api`. Reusable UI is split between `src/components/ui` for primitives and `src/components` for site-specific sections like `navbar`, `about-me`, and Spotify widgets. Shared data and helpers live in `src/lib`, while client context is in `src/context`. Static assets such as logos and favicons are stored in `public/`.

## Build, Test, and Development Commands

- `pnpm dev`: start the local development server on `localhost:3000`.
- `pnpm build`: create a production build and catch type or route errors.
- `pnpm start`: run the built app locally.
- `pnpm lint`: lint application code with Oxlint's Next.js, React, accessibility, and TypeScript rules.
- `pnpm lint:fix`: safely fix auto-fixable lint issues.
- `pnpm format`: format the repository with Oxfmt, including imports and Tailwind classes.
- `pnpm format:check`: check formatting without changing files.
- `pnpm typecheck`: type-check the application without emitting files.
- `pnpm check`: run all pre-PR verification in one command.

Use `pnpm check` before opening a PR.

## Coding Style & Naming Conventions

TypeScript is the default. Oxfmt enforces 2-space indentation, semicolons, single quotes, JSX single quotes, and `printWidth: 100`. It also sorts Tailwind classes and imports. Imports are ordered builtin, internal, external, then parent/sibling groups with blank lines between groups.

Use `PascalCase` for React components, `camelCase` for variables and functions, and route-folder naming that matches Next.js conventions (`page.tsx`, `route.tsx`, `[slug]`). Keep site-specific components in `src/components` and generic primitives in `src/components/ui`.

## Testing Guidelines

There is no dedicated test runner configured yet. Current verification is lint-, format-, typecheck-, and build-based: run `pnpm check` for every change. When adding tests later, colocate them near the feature or under `src/__tests__`, and prefer names like `component-name.test.tsx`.

## Commit & Pull Request Guidelines

Recent history uses short, conventional-style subjects such as `feat:`, `perf:`, `style:`, and `content:`. Keep commits focused and descriptive, for example `feat: modernize contact email rendering`.

PRs should include:

- a short description of the change and why it was made
- linked issues when applicable
- screenshots or recordings for UI changes
- note of verification performed (`pnpm check`)

## Configuration Tips

Spotify and contact features depend on environment variables. Keep secrets out of the repo and configure `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `RESEND_API_KEY`, and `RESEND_RECEIVER` locally before testing those flows. Spotify grants are encrypted and stored in a private Vercel Blob store; do not add refresh tokens to environment files.
