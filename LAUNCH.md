# Launch runbook

The new site lives on stacked branches, `modernize/v2` through `modernize/phase-8-seo` (and any later
phase). Nothing has been pushed or merged. **Merging into `main` replaces the live site**, so launch in
this order and stop at any step that does not look right.

## 0. Before anything is pushed

- [ ] Phase 8 and the final polish are committed (`git log --oneline` on the newest branch).
- [ ] `npm run verify` passes locally (typecheck, lint, build).
- [ ] The old Sanity API token is revoked at sanity.io/manage (it was in the old code and git history).
- [ ] Content is in the Studio and published (check each of these once):
  - Profile: hero headline and intro, hero image and portrait, Career path, How I lead, featured case studies.
  - Site settings: email, location, availability, social links, **CV PDF**.
  - Case studies, Experience (typo "Full StackDeveloper"), Martial arts (4 entries).
- [ ] The Studio is redeployed (`npx sanity deploy` in `sanity-project/`) so it shows the new schema.

## 1. Preview on a private URL (no change to the live site)

1. Push the newest branch: `git push -u origin modernize/phase-8-seo`. The branches are stacked, so this
   carries every earlier commit. Vercel builds a **preview** deployment for the branch.
2. In Vercel, project settings, Environment Variables, make sure these exist for **Preview** and **Production**:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `lx7gopy9` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.mathisudhanan.com` |
   | `SANITY_REVALIDATE_SECRET` | a long random string (also used in step 3) |

3. Open the preview URL and walk every page on a phone and a laptop. Previews are noindexed automatically.

## 2. Open a pull request

Open a PR from the branch into `main`. CI runs `npm ci`, typecheck, lint and build. Do not merge until it is
green and you have reviewed the preview.

## 3. Connect Sanity to the site (so edits appear within seconds)

In sanity.io/manage, project `lx7gopy9`, API, Webhooks, create:

- URL: `https://www.mathisudhanan.com/api/revalidate`
- Dataset: `production`; trigger on create, update and delete; **Drafts off**
- Projection: `{ _type }`
- Secret: the same value as `SANITY_REVALIDATE_SECRET`

Without it, edits still appear, but only after the one-hour cache expires.

## 4. Merge and verify production

1. Merge the PR. Vercel deploys to production.
2. Check https://www.mathisudhanan.com: home, each page, the case study, the CV link, `robots.txt` (should
   allow crawling) and `sitemap.xml`.
3. Edit something small in the Studio and confirm it appears on the site within seconds.
4. Share a link in a chat app to check the social preview image.
5. Add the site in Google Search Console and submit `https://www.mathisudhanan.com/sitemap.xml`.

## 5. After launch

- The CSP header is report-only. Browse the live site with the console open; when no violations appear,
  change `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `next.config.js`.
- The contact page uses a `mailto:` link. A form needs an email provider key and a booking URL.
- Delete merged `modernize/*` branches when you are happy.

## Rollback

Vercel keeps every deployment. In the Vercel dashboard, open Deployments and promote the previous
production deployment to restore the old site instantly. Content changes never need a rollback: unpublish
or edit in the Studio.
