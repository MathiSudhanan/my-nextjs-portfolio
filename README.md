# Mathi Sudhanan | portfolio

Next.js (App Router, migrating from the Pages Router) with Sanity as the CMS.
Production: https://www.mathisudhanan.com

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` |
| `npm run lint` | ESLint (the Studio and legacy Pages Router code are excluded) |
| `npm run typegen` | Extract the Studio schema and regenerate `src/sanity.types.ts` |
| `npm run verify` | typecheck, lint and build, the same steps as CI |

## Structure

```
src/
  app/                 App Router: layout, routes, /api/revalidate webhook
  lib/
    env.ts             validated environment variables
    site.ts            site name, description, canonical URL
    sanity/            server-only client, tagged fetch, queries, image builder
  sanity.types.ts      generated, do not edit
  pages/ components/ hooks/ Utils/ sanity.ts typings.d.ts styles/
                       legacy Pages Router code, removed as each page moves to app/
sanity-project/        Sanity Studio (own package.json), deployed separately
```

## Data and caching

- `src/lib/sanity/client.ts` imports `server-only`, so a client component that
  imports it fails the build. The dataset is public-read; there is no token.
- Every query goes through `sanityFetch({ query, tags })`. Tags are
  `sanity:<documentType>`; results are also revalidated hourly as a fallback.
- Write queries with `defineQuery` in `src/lib/`, project explicit fields (never
  `...`), then run `npm run typegen` to get typed results.

## Environment

Copy `.env.example`. `NEXT_PUBLIC_*` values are public. `SANITY_REVALIDATE_SECRET`
is server-only and must be set in Vercel and `.env.local`.

## Revalidation webhook

In the Sanity dashboard (API, Webhooks) create a webhook:

- URL: `https://www.mathisudhanan.com/api/revalidate`
- Trigger on: create, update, delete, with Drafts off
- Projection: `{ _type }`
- Secret: the value of `SANITY_REVALIDATE_SECRET`

## Modernisation status

Phase 0 (security and cleanup) and Phase 1 (foundation) are done. Home is still
served by `src/pages/index.tsx`; it moves to `src/app` in Phase 4.
