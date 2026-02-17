# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js + TypeScript site with MDX content and Tailwind styling.
- `pages/`: route pages and API endpoints (`pages/api/*`).
- `components/`: reusable UI components (`components/metrics/*` for dashboard cards).
- `layouts/`: MDX layout wrappers (blog, newsletter, snippets, now/uses).
- `data/`: content source files (`data/blog`, `data/newsletter`, `data/snippets`, `data/category`).
- `lib/`: integrations and utilities (Spotify, Strava, analytics, Prisma helpers).
- `public/`: static assets (images, fonts, favicons).
- `scripts/`: RSS/sitemap generation and image conversion helpers.
- `prisma/`: schema and generated client support.

## Build, Test, and Development Commands
Use Yarn (lockfile is `yarn.lock`).
- `yarn`: install dependencies.
- `yarn dev`: run local dev server at `http://localhost:3000`.
- `yarn lint`: run Next.js ESLint checks.
- `yarn build`: production build (includes `contentlayer build` prebuild and RSS/sitemap postbuild scripts).
- `yarn start`: serve the built app.
- `yarn showdb`: open Prisma Studio for local DB inspection.

## Coding Style & Naming Conventions
- TypeScript/TSX with 2-space indentation and single quotes.
- Prettier is configured in `package.json` (`tabWidth: 2`, `singleQuote: true`, `trailingComma: none`).
- Follow Next.js ESLint rules from `.eslintrc`.
- Name React components in `PascalCase` (for example, `TopBlogPosts.tsx`).
- Keep route and utility filenames descriptive and lowercase where appropriate (for example, `pages/api/top-tracks.ts`).
- Keep MDX slugs stable: `data/blog/<slug>.mdx` maps to `/blog/<slug>`.

## Testing Guidelines
There is currently no dedicated automated test framework in this repo. Minimum validation for changes:
- `yarn lint`
- `yarn build`
- Manual checks of changed routes/components in `yarn dev`.
- For API changes, verify the corresponding endpoint in `pages/api/*` and any dependent dashboard cards.

## Commit & Pull Request Guidelines
Recent history uses concise, imperative subjects and occasional Conventional Commit scopes (`refactor(blog): ...`, `chore(build): ...`). Prefer:
- One focused commit per logical change.
- Subject line in imperative mood, optionally scoped.
- Include context in body when changing data flow, env vars, or scripts.

For PRs, include:
- What changed and why.
- Affected routes/content paths (for example, `pages/blog/[slug].tsx`, `data/blog/*`).
- Screenshots/GIFs for UI changes.
- Manual verification steps and any required `.env` updates.
