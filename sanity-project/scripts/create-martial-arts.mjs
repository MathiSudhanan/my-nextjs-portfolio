/**
 * Creates the four Martial art entries as DRAFTS in the production dataset:
 * Kung Fu, Silambam, Kalaripayattu and Varmakalai.
 *
 *   node scripts/create-martial-arts.mjs                          dry run: prints the plan, writes nothing
 *   npx sanity exec scripts/create-martial-arts.mjs --with-user-token -- --apply
 *   npx sanity exec scripts/create-martial-arts.mjs --with-user-token -- --rollback --apply   deletes the drafts
 *
 * Drafts are not public, so nothing appears on the site until you review each one in
 * the Studio and publish it. createIfNotExists means re-running never overwrites edits.
 *
 * What is written here comes from facts you gave (the arts, and the years you started
 * Kung Fu 1997, Silambam 1997, Kalaripayattu 2019 and Varmakalai 2021) and from the approved design
 * specification (the engineering parallels). "What the training demands" and "What it
 * taught me" are left empty because they are yours to write.
 */
import {pathToFileURL} from 'node:url'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`

const ARTS = [
  {
    slug: 'kung-fu',
    name: 'Kung Fu',
    startYear: 1997,
    summary:
      'Forms practised thousands of times until movement is automatic, and stances held until they are stable.',
    engineeringParallel:
      'Stance: foundations first, such as CI, observability, contracts and a security baseline. Form: conventions and golden paths, so teams move fast because the basics are automatic.',
  },
  {
    slug: 'silambam',
    name: 'Silambam',
    startYear: 1997,
    summary: 'The Tamil staff art, built on footwork patterns and control of distance.',
    engineeringParallel:
      'Distance: boundaries and coupling. Keep services at the right range, with bounded contexts and explicit contracts, and handle concurrent demand.',
  },
  {
    slug: 'kalaripayattu',
    name: 'Kalaripayattu',
    startYear: 2019,
    summary:
      'A staged path from body conditioning to wooden weapons, metal weapons and bare hand, studied from 2019.',
    engineeringParallel:
      'Growth from tools to principles: control of the basics first, then sharper tools with higher stakes, and finally judgement that works whatever the technology.',
  },
  {
    slug: 'varmakalai',
    name: 'Varmakalai',
    startYear: 2021,
    summary:
      'The Tamil tradition of vital-point knowledge, practised both as a martial art and as medicine.',
    engineeringParallel:
      'Knowing a system’s vital points: single points of failure, hot paths and blast radius, and where one precise change has the largest effect.',
  },
]

const draftId = (slug) => `drafts.martialArt-${slug}`

function buildDocument(art, index) {
  return {
    _id: draftId(art.slug),
    _type: 'martialArt',
    name: art.name,
    slug: {_type: 'slug', current: art.slug},
    ...(art.startYear ? {startYear: art.startYear} : {}),
    summary: art.summary,
    engineeringParallel: art.engineeringParallel,
    order: index + 1,
  }
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

async function mutate(mutations, token) {
  const res = await fetch(`${API}/data/mutate/${DATASET}?visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations}),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Write failed, nothing was changed: ${res.status} ${text}`)
}

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const rollback = args.includes('--rollback')

  const docs = ARTS.map(buildDocument)
  const problems = docs.flatMap((d) => (d.summary.length > 240 ? [`${d.name}: summary is ${d.summary.length} chars (max 240)`] : []))
  if (problems.length) throw new Error(`Content problems:\n  - ${problems.join('\n  - ')}`)

  console.log(`${rollback ? 'ROLLBACK' : 'CREATE MARTIAL ARTS'} ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  for (const doc of docs) {
    const detail = rollback ? 'delete draft' : `startYear ${doc.startYear ?? '(empty: set it in the Studio)'}`
    console.log(`  ${doc._id}  ${doc.name}  ${detail}`)
  }
  if (!rollback) console.log('\n  NOT set: what the training demands, what it taught me, story, photographs (yours to write)')

  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run `npx sanity exec scripts/create-martial-arts.mjs --with-user-token -- --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }
  await mutate(
    rollback ? docs.map((d) => ({delete: {id: d._id}})) : docs.map((d) => ({createIfNotExists: d})),
    token,
  )
  console.log(rollback ? '\nDeleted the drafts.' : '\nCreated the drafts. Review each in the Studio, then publish.')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`\n${error.message}`)
    process.exit(1)
  })
}
