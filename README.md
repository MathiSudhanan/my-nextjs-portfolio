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
  app/                 App Router: layout, fonts, globals.css, routes, /api/revalidate
    design-system/     living style guide (dev and Vercel previews only, noindex)
  components/
    ui/                Button, Typography, Layout (Container, Section), Badges, Icon
    layout/            Header, MobileMenu, NavLinks, Footer, SkipLink, Brand
    patterns/          Mandala (decorative circular geometry)
  lib/
    env.ts             validated environment variables
    site.ts            site name, description, canonical URL
    navigation.ts      primary navigation, CV and contact links
    cn.ts              class-name joiner
    sanity/            server-only client, tagged fetch, queries, image builder
  styles/
    theme.css          design tokens (@theme): colour, type scale, spacing, motion
    base.css           base layer: focus ring, selection, reduced motion
    utilities.css      type roles, page gutter, grid pattern, header hairline
    legacy.css         Pages Router styles, removed with src/pages in Phase 4
  sanity.types.ts      generated, do not edit
  pages/ components/*.tsx hooks/ Utils/ sanity.ts typings.d.ts
                       legacy Pages Router code, removed as each page moves to app/
sanity-project/        Sanity Studio (own package.json), deployed separately
```

## Design system

Tailwind CSS 4 with the tokens in `src/styles/theme.css`. The site is dark only: cyan
fails contrast on light backgrounds. Colours are semantic (`bg-bg`, `bg-surface`,
`text-fg`, `text-muted`, `text-accent`, `border-line`); typography uses the role
utilities `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-lead`, `type-label`
and `type-data`. Run the app and open `/design-system` for every token and component.

The App Router and legacy Pages Router stylesheets are built separately from scoped
sources, so legacy classes never reach new pages and the reverse.

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

Phases 0 (security and cleanup), 1 (foundation) and 2 (design system) are done.
Home is still served by `src/pages/index.tsx`; it moves to `src/app` in Phase 4.
