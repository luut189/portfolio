# Repository Guidelines

## Project Structure & Module Organization
This repo is a Next.js 16 App Router portfolio. Application routes live in `src/app`, including page routes such as `src/app/projects`, `src/app/contact`, and API handlers under `src/app/api`. Reusable UI is split between `src/components/ui` for primitives and `src/components` for site-specific sections like `navbar`, `about-me`, and Spotify widgets. Shared data and helpers live in `src/lib`, while client context is in `src/context`. Static assets such as logos and favicons are stored in `public/`.

## Build, Test, and Development Commands
- `yarn dev`: start the local development server on `localhost:3000`.
- `yarn build`: create a production build and catch type or route errors.
- `yarn start`: run the built app locally.
- `yarn lint src`: lint application code with the Next.js and TypeScript rules.
- `yarn format`: format the repository with Prettier and the Tailwind plugin.

Use `yarn build` and `yarn lint src` before opening a PR.

## Coding Style & Naming Conventions
TypeScript is the default. Prettier enforces 2-space indentation, semicolons, single quotes, JSX single quotes, and `printWidth: 100`. Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`. Follow the existing import ordering enforced by ESLint: builtin, internal, external, then parent/sibling groups with blank lines between groups.

Use `PascalCase` for React components, `camelCase` for variables and functions, and route-folder naming that matches Next.js conventions (`page.tsx`, `route.tsx`, `[slug]`). Keep site-specific components in `src/components` and generic primitives in `src/components/ui`.

## Testing Guidelines
There is no dedicated test runner configured yet. Current verification is build- and lint-based: run `yarn lint src` and `yarn build` for every change. When adding tests later, colocate them near the feature or under `src/__tests__`, and prefer names like `component-name.test.tsx`.

## Commit & Pull Request Guidelines
Recent history uses short, conventional-style subjects such as `feat:`, `perf:`, `style:`, and `content:`. Keep commits focused and descriptive, for example `feat: modernize contact email rendering`.

PRs should include:
- a short description of the change and why it was made
- linked issues when applicable
- screenshots or recordings for UI changes
- note of verification performed (`yarn lint src`, `yarn build`)

## Configuration Tips
Spotify and contact features depend on environment variables. Keep secrets out of the repo and configure `SPOTIFY_REFRESH_TOKEN`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `RESEND_API_KEY`, and `RESEND_RECEIVER` locally before testing those flows.
