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
  app/                 App Router: layout, fonts, globals.css, pages, /api/revalidate
    page.tsx           home
    contact/           contact (email, copy button, social links)
    design-system/     living style guide (dev and Vercel previews only, noindex)
  features/
    home/              Hero, HeroDiagram, ProofStrip, SelectedWork, CtaBand, queries, data
  components/
    ui/                Button, Typography, Layout, Badges, Icon, CaseCard, CopyField
    layout/            Header, MobileMenu, NavLinks, Footer, SkipLink, Brand
    patterns/          Mandala (decorative circular geometry)
  lib/
    env.ts             validated environment variables
    site.ts            site name, role, description, canonical URL
    navigation.ts      routes with a `live` flag; nav and cards link only to live routes
    availability.ts    availability wording from the CMS
    cn.ts              class-name joiner
    sanity/            server-only client, tagged fetch, queries, image helper and loader
  styles/              theme.css (tokens), base.css, utilities.css (type roles, motion)
  sanity.types.ts      generated, do not edit
sanity-project/        Sanity Studio (own package.json), deployed separately
```

## Design system

Tailwind CSS 4 with the tokens in `src/styles/theme.css`. The site is dark only: cyan
fails contrast on light backgrounds. Colours are semantic (`bg-bg`, `bg-surface`,
`text-fg`, `text-muted`, `text-accent`, `border-line`); typography uses the role
utilities `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-lead`, `type-label`
and `type-data`. Run the app and open `/design-system` for every token and component.

Tailwind's default palette is removed, so only the semantic tokens exist. Motion is CSS
only (`animate-rise`, `animate-draw`, `reveal`) and never changes opacity on scroll, so text
keeps its contrast at every moment; everything is disabled under `prefers-reduced-motion`.

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

## Content model (Sanity)

Singletons `siteSettings` and `profile`; documents `caseStudy`, `project`, `experience`,
`technology`, `martialArt`, `article`, `certification`, `testimonial`; shared objects `seo`,
`richText` (with figure, diagram, decision record, callout and code snippet blocks),
`metric`, `decisionRecord` and `tradeOff`. The legacy `pageInfo`, `skill` and `social` types
stay, hidden from "create new", until the new site launches. After changing a schema run
`npm run typegen`.

Images need alt text, or the Decorative flag. Years are stored as numbers (`startYear`,
`since`) so the site computes durations that never go stale.

## Content migration (one time)

`sanity-project/scripts/migrate-content-model.mjs` creates the new documents from the legacy
ones. It is additive: it never edits or deletes legacy content, and it does not copy phone
number or address.

```
cd sanity-project
npm run migrate:content                      # dry run against the live dataset: prints the plan
npm run migrate:content -- --file backup.json    # dry run against a backup file
npm run migrate:content:apply                # writes, as one transaction, using your `sanity login` session
SANITY_AUTH_TOKEN=... npm run migrate:content -- --apply      # same, with an Editor token instead
SANITY_AUTH_TOKEN=... npm run migrate:content -- --rollback --apply
```

Take a backup first (`npx sanity dataset export production backups/pre-migration.tar.gz`, after
`npx sanity login`). `SANITY_AUTH_TOKEN` is an Editor token from the Sanity dashboard (API,
Tokens); it is only ever read from the environment.

## Revalidation webhook

In the Sanity dashboard (API, Webhooks) create a webhook:

- URL: `https://www.mathisudhanan.com/api/revalidate`
- Trigger on: create, update, delete, with Drafts off
- Projection: `{ _type }`
- Secret: the value of `SANITY_REVALIDATE_SECRET`

## Modernisation status

Phases 0 to 3 are done and Phase 4 (home page, hero, contact, legacy cutover) is built. The
Pages Router code is gone, so **do not merge to `main` until the Experience, Architecture and
About pages exist**: the live site's Experience, Skills and Projects sections are not yet
replaced. Flip `live` in `src/lib/navigation.ts` as each route ships.

The hero shows the Silambam photograph from Profile > Hero image when set, and is typographic
(with the layered-stack diagram) when it is empty.
