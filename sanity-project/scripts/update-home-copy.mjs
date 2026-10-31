/**
 * Sets the home hero copy to the approved design specification:
 *
 *   headline     Systems that hold their form under pressure.
 *   positioning  I'm Mathi Sudhanan, a full-stack architect ... build the stance before you add speed.
 *   subheadline  removed (the spec's hero has no subline)
 *
 *   node scripts/update-home-copy.mjs                                dry run: shows before and after, writes nothing
 *   npx sanity exec scripts/update-home-copy.mjs --with-user-token -- --apply
 *   npx sanity exec scripts/update-home-copy.mjs --with-user-token -- --rollback --apply   restore the previous copy
 *
 * Only the Profile document's three copy fields are touched. If the Studio holds an
 * unpublished draft of the Profile, publish or discard it afterwards so it does not
 * shadow these changes.
 */
import {pathToFileURL} from 'node:url'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`

const NEW_COPY = {
  headline: 'Systems that hold their form under pressure.',
  positioning:
    "I'm Mathi Sudhanan, a full-stack architect with 20+ years designing and leading .NET, Spring Boot and React/Next.js systems. I also train in Kung Fu, Kalaripayattu and Silambam. Both teach the same lesson: build the stance before you add speed.",
}

// What the Phase 3 migration wrote, for --rollback.
const PREVIOUS_COPY = {
  headline: 'Engineering systems with discipline.',
  subheadline: 'Foundations first. Then speed.',
}

async function resolveToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  try {
    const {getCliClient} = await import('sanity/cli')
    return getCliClient({apiVersion: API_VERSION, projectId: PROJECT_ID, dataset: DATASET}).config().token
  } catch {
    return undefined
  }
}

async function readProfile() {
  const groq = `*[_type == "profile"]{_id, headline, subheadline, positioning}`
  const res = await fetch(`${API}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`)
  if (!res.ok) throw new Error(`Query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

const show = (value) => (value == null || value === '' ? '(empty)' : JSON.stringify(value))

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const rollback = args.includes('--rollback')

  const profiles = await readProfile()
  if (profiles.length !== 1) throw new Error(`Expected exactly one profile document, found ${profiles.length}.`)
  const [profile] = profiles

  const patch = rollback
    ? {set: {...PREVIOUS_COPY}, unset: ['positioning']}
    : {set: {...NEW_COPY}, unset: ['subheadline']}

  console.log(`${rollback ? 'ROLLBACK' : 'UPDATE HOME COPY'} ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`document: ${profile._id}\n`)
  for (const field of ['headline', 'subheadline', 'positioning']) {
    const next = patch.set[field] ?? (patch.unset.includes(field) ? null : profile[field])
    const changed = show(next) !== show(profile[field])
    console.log(`  ${field}${changed ? '' : '  (unchanged)'}`)
    if (changed) {
      console.log(`    now:  ${show(profile[field])}`)
      console.log(`    then: ${show(next)}`)
    }
  }

  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run `npx sanity exec scripts/update-home-copy.mjs --with-user-token -- --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }
  const res = await fetch(`${API}/data/mutate/${DATASET}?visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations: [{patch: {id: profile._id, ...patch}}]}),
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
