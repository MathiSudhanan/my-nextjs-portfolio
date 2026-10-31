/**
 * Replaces the architecture diagram in your published "Permission API" case study with
 * the redrawn eight-level flowchart (scripts/content/permission-evaluation.svg), and sets
 * its alt text and text description to match.
 *
 * Only the diagram image, its alt text and its text description change. The caption, the
 * rest of the architecture section and every other field are left alone.
 *
 *   node scripts/replace-permission-diagram.mjs                      dry run: lists the diagram(s) it would change
 *   npx sanity exec scripts/replace-permission-diagram.mjs --with-user-token -- --apply
 *
 * The old image stays in Sanity's asset library, unused. If the Studio holds an unpublished
 * draft of this case study, publish or discard it first, or it will hide the change.
 */
import {readFile} from 'node:fs/promises'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {DIAGRAM_ALT, DIAGRAM_DESCRIPTION} from './create-permission-case-study.mjs'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`
const SLUG = 'permission-api'
const SVG = fileURLToPath(new URL('./content/permission-evaluation.svg', import.meta.url))

async function resolveToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  try {
    const {getCliClient} = await import('sanity/cli')
    return getCliClient({apiVersion: API_VERSION, projectId: PROJECT_ID, dataset: DATASET}).config().token
  } catch {
    return undefined
  }
}

async function readCaseStudy() {
  const groq = `*[_type == "caseStudy" && slug.current == $slug][0]{_id, _rev, architecture}`
  const url = new URL(`${API}/data/query/${DATASET}`)
  url.searchParams.set('query', groq)
  url.searchParams.set('$slug', JSON.stringify(SLUG))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

async function main() {
  const apply = process.argv.slice(2).includes('--apply')

  const doc = await readCaseStudy()
  if (!doc) throw new Error(`No published case study with slug "${SLUG}".`)
  const diagrams = (doc.architecture ?? []).filter((block) => block._type === 'diagram')
  if (diagrams.length === 0) {
    throw new Error(
      'The architecture section has no "Architecture diagram" block. Add one in the Studio (Insert > Architecture diagram) and run this again.',
    )
  }

  console.log(`REPLACE DIAGRAM ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`document: ${doc._id}`)
  for (const block of diagrams) {
    console.log(`  diagram ${block._key}`)
    console.log(`    image:       ${block.asset?._ref ?? '(none)'}  ->  new permission-evaluation.svg`)
    console.log(`    alt text:    ${(block.alt ?? '(empty)').slice(0, 70)}...  ->  updated`)
    console.log(`    description: ${(block.description ?? '(empty)').slice(0, 50)}...  ->  updated`)
    console.log(`    caption:     ${block.caption ? JSON.stringify(block.caption) : '(none)'}  (kept)`)
  }

  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run `npx sanity exec scripts/replace-permission-diagram.mjs --with-user-token -- --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }

  const upload = await fetch(`${API}/assets/images/${DATASET}?filename=permission-evaluation.svg`, {
    method: 'POST',
    headers: {'Content-Type': 'image/svg+xml', Authorization: `Bearer ${token}`},
    body: await readFile(SVG),
  })
  if (!upload.ok) throw new Error(`Upload failed: ${upload.status} ${await upload.text()}`)
  const assetId = (await upload.json()).document._id

  const set = {}
  for (const block of diagrams) {
    const base = `architecture[_key=="${block._key}"]`
    set[`${base}.asset`] = {_type: 'reference', _ref: assetId}
    set[`${base}.alt`] = DIAGRAM_ALT
    set[`${base}.description`] = DIAGRAM_DESCRIPTION
  }
  // ifRevisionID makes the write fail, changing nothing, if the document was edited meanwhile.
  const res = await fetch(`${API}/data/mutate/${DATASET}?visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations: [{patch: {id: doc._id, ifRevisionID: doc._rev, set}}]}),
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
