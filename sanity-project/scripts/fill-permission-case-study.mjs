/**
 * Fills the EMPTY fields of your existing published "Permission API" case study with the
 * drafted content from create-permission-case-study.mjs: constraints, context, leadership,
 * technology decisions, trade-offs, data flow, security, performance, deployment, metrics,
 * technologies and the confidential flag.
 *
 * A field that already has content is never touched. The title, slug, outcome, summary,
 * role, domain, duration, team size, problem, architecture, lessons and images are never
 * touched either.
 *
 *   node scripts/fill-permission-case-study.mjs                      dry run: lists what would be filled
 *   npx sanity exec scripts/fill-permission-case-study.mjs --with-user-token -- --apply
 *
 * It patches the published document directly. If the Studio holds an unpublished draft
 * of this case study, publish or discard that draft first, or it will hide the new fields.
 */
import {pathToFileURL} from 'node:url'
import {TECHNOLOGIES, buildDocument} from './create-permission-case-study.mjs'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`
const SLUG = 'permission-api'

// Only these fields may be filled, and only when empty.
const FILLABLE = [
  'constraints',
  'context',
  'leadership',
  'technologyDecisions',
  'tradeOffs',
  'dataFlow',
  'security',
  'performance',
  'deployment',
  'metrics',
  'techStack',
  'confidential',
]

const isEmpty = (value) =>
  value === null || value === undefined || (Array.isArray(value) && value.length === 0)

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
  const apply = process.argv.slice(2).includes('--apply')

  const existing = await query(`*[_type == "caseStudy" && slug.current == $slug][0]`, {slug: SLUG})
  if (!existing) throw new Error(`No published case study with slug "${SLUG}".`)

  const technologies = await query(`*[_type == "technology" && name in $names]{_id, name}`, {names: TECHNOLOGIES})
  const technologyIds = TECHNOLOGIES.map((name) => technologies.find((t) => t.name === name)?._id)
  if (technologyIds.some((id) => !id)) throw new Error('A technology document is missing in Sanity.')

  const drafted = buildDocument({heroAssetId: 'unused', diagramAssetId: 'unused', technologyIds})

  const fill = {}
  const kept = []
  for (const field of FILLABLE) {
    if (isEmpty(existing[field])) fill[field] = drafted[field]
    else kept.push(field)
  }

  console.log(`FILL CASE STUDY ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`document: ${existing._id}  "${existing.title}"\n`)
  console.log(`  will fill (${Object.keys(fill).length}): ${Object.keys(fill).join(', ') || '(none)'}`)
  console.log(`  keeps your content (${kept.length}): ${kept.join(', ') || '(none)'}`)
  console.log('  never touched: title, slug, outcome, summary, role, domain, duration, team size, problem, architecture, lessons, images')

  if (Object.keys(fill).length === 0) return console.log('\nNothing to do.')
  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run `npx sanity exec scripts/fill-permission-case-study.mjs --with-user-token -- --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }
  const res = await fetch(`${API}/data/mutate/${DATASET}?visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    // ifRevisionID makes the write fail, changing nothing, if someone edited the document meanwhile.
    body: JSON.stringify({mutations: [{patch: {id: existing._id, ifRevisionID: existing._rev, set: fill}}]}),
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
