/**
 * Chooses which case studies appear in "Selected work" on the home page, by slug.
 * It sets Profile > Featured case studies (up to three, in the order given).
 *
 *   node scripts/feature-case-study.mjs permission-api                 dry run: shows what would change
 *   npx sanity exec scripts/feature-case-study.mjs --with-user-token -- permission-api --apply
 *   npx sanity exec scripts/feature-case-study.mjs --with-user-token -- --clear --apply   empty the list
 *
 * Only the Profile's featuredCaseStudies field is touched. Only published case
 * studies can be featured.
 */
import {pathToFileURL} from 'node:url'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`

async function resolveToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  try {
    const {getCliClient} = await import('sanity/cli')
    return getCliClient({apiVersion: API_VERSION, projectId: PROJECT_ID, dataset: DATASET}).config().token
  } catch {
    return undefined
  }
}

async function query(groq, params = {}) {
  const url = new URL(`${API}/data/query/${DATASET}`)
  url.searchParams.set('query', groq)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const clear = args.includes('--clear')
  const slugs = args.filter((a) => !a.startsWith('--'))

  if (!clear && slugs.length === 0) throw new Error('Give one to three case-study slugs, or --clear.')
  if (slugs.length > 3) throw new Error('At most three case studies can be featured.')

  const available = await query(`*[_type == "caseStudy" && defined(slug.current)]{_id, title, "slug": slug.current}`)
  const profile = await query(`*[_type == "profile"]{_id, "current": featuredCaseStudies[]._ref}`)
  if (profile.length !== 1) throw new Error(`Expected exactly one profile document, found ${profile.length}.`)

  const chosen = slugs.map((slug) => {
    const found = available.find((c) => c.slug === slug)
    if (!found) {
      throw new Error(
        `No published case study with slug "${slug}". Published: ${available.map((c) => c.slug).join(', ') || '(none)'}`,
      )
    }
    return found
  })

  console.log(`FEATURE CASE STUDIES ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`profile: ${profile[0]._id}`)
  console.log(`  now:  ${(profile[0].current ?? []).join(', ') || '(none)'}`)
  console.log(`  then: ${chosen.map((c) => `${c.title} [${c.slug}]`).join(', ') || '(none)'}`)

  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run it with `npx sanity exec scripts/feature-case-study.mjs --with-user-token -- <slug> --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }
  const patch = clear
    ? {id: profile[0]._id, unset: ['featuredCaseStudies']}
    : {
        id: profile[0]._id,
        set: {
          featuredCaseStudies: chosen.map((c) => ({_type: 'reference', _key: c._id.slice(0, 12), _ref: c._id})),
        },
      }
  const res = await fetch(`${API}/data/mutate/${DATASET}?visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations: [{patch}]}),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Write failed, nothing was changed: ${res.status} ${text}`)
  console.log('\nApplied.')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`\n${error.message}`)
    process.exit(1)
  })
}
