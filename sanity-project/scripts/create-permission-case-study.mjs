/**
 * Creates the "Permission platform" case study as a DRAFT in the production dataset.
 *
 *   node scripts/create-permission-case-study.mjs                 dry run: prints the document, writes nothing
 *   npx sanity exec scripts/create-permission-case-study.mjs --with-user-token -- --apply
 *                                                                 uploads two SVGs and creates the draft
 *   npx sanity exec scripts/create-permission-case-study.mjs --with-user-token -- --rollback --apply
 *                                                                 deletes the draft (never a published copy)
 *
 * A draft is not served by the public API, so nothing appears on the site until you
 * review it in the Studio, write "Lessons learned", and publish. createIfNotExists
 * means re-running never overwrites edits you made in the Studio. Uploaded SVGs are
 * content-addressed, so re-running does not create duplicates.
 */
import {readFile} from 'node:fs/promises'
import {fileURLToPath, pathToFileURL} from 'node:url'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = '2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`
const DRAFT_ID = 'drafts.caseStudy-permission-platform'
const PUBLISHED_ID = 'caseStudy-permission-platform'
export const DIAGRAM_ALT =
  'Flowchart of the permission evaluation order. A user-level permission, if set, is used and overrides every other level. Then a user group permission overrides the levels below it. Category and stat must each be allowed. Client Fund and Fund take the least permissive answer, Fund takes precedence over Portfolio, and a Portfolio permission returns all its data, with the Base Profile as the default.'
export const DIAGRAM_DESCRIPTION =
  'A request is checked from the most specific level down. 1: if a user-level permission is set, it is used and overrides every other level. 2: if a user group permission is set, it is used and overrides every level below it. 3: if the category is not permitted, access is denied. 4: if the stat is not permitted, access is denied. 5: the Client Fund and Fund levels are compared and the least permissive wins, so a No at either denies access. 6: if a Fund level exists it takes precedence over Portfolio, and the Portfolio level is ignored. 7: if a Portfolio permission is set and nothing further overrides it, all the portfolio’s data is returned. 8: otherwise the Base Profile default permissions apply. The data within the allowed scope is then returned.'

export const TECHNOLOGIES = ['.NET Core', 'Web API', 'SQL Server', 'React', 'TypeScript']

const here = (name) => fileURLToPath(new URL(`./content/${name}`, import.meta.url))

// --- portable text helpers (keys are stable so re-runs produce identical documents) ---
let keyCounter = 0
const key = (prefix) => `${prefix}${++keyCounter}`
const span = (text) => ({_type: 'span', _key: key('s'), text, marks: []})
const block = (text, style = 'normal', extra = {}) => ({
  _type: 'block',
  _key: key('b'),
  style,
  markDefs: [],
  children: [span(text)],
  ...extra,
})
const p = (text) => block(text)
const h3 = (text) => block(text, 'h3')
const numbered = (text) => block(text, 'normal', {listItem: 'number', level: 1})
const ref = (id) => ({_type: 'reference', _ref: id})
const imageRef = (assetId) => ({_type: 'reference', _ref: assetId})

export function buildDocument({heroAssetId, diagramAssetId, technologyIds}) {
  keyCounter = 0
  return {
    _id: DRAFT_ID,
    _type: 'caseStudy',
    title: 'One permission service for five platforms',
    slug: {_type: 'slug', current: 'permission-platform'},
    outcome:
      'One data-level permission service for five platforms, delivered in six months, with calls roughly four times faster than before.',
    summary:
      'A central permission service replaced the per-service implementations across five platforms, so every report returns only the data the client is entitled to.',
    role: 'Application Architect',
    domain: 'Financial risk calculation',
    duration: '6 months',
    teamSize: 3,
    confidential: true,
    heroImage: {
      _type: 'image',
      asset: imageRef(heroAssetId),
      alt: 'Eight permission levels stacked from most specific to least specific: User, User Group, Category, Stat, Client Fund, Fund, Portfolio and Base Profile, with an arrow showing that higher means more precedence.',
      decorative: false,
      caption: 'The eight permission levels, most specific first.',
    },
    techStack: technologyIds.map((id) => ({_type: 'reference', _key: key('t'), _ref: id})),

    problem: [
      p(
        'Permissions were implemented separately in each microservice, each in its own way. The results were inconsistent and hard to judge.',
      ),
      p('When restricted data was exposed, there was no way to track how it had got out.'),
    ],
    context: [
      p(
        'The client is a financial risk platform, described generically here. Five applications were involved, including a calculation engine and an operations application. A client’s access is granted at eight levels: Base Profile (the default permissions), Portfolio (a collection of funds), Fund, Client Fund, Stat (a specific calculation), Category (for example country or sector), User Group and User.',
      ),
      p(
        'Permissions applied at several levels at once, from a default Base Profile up to individual users. Stat and Category permissions followed a waterfall across those levels. Report-date permissions for daily and monthly dates applied to both funds and portfolios. The data ran to millions of records.',
      ),
    ],
    constraints: [
      'Five existing applications, including the calculation engine, had to adopt it',
      'Six months to deliver, together with the Permission UI',
      'Compliance: an endpoint call returns the necessary data, and only the data the client has access to',
      'Permissions came from several microservices, each handling them in its own way',
      'Every phase added to or changed the requirements',
    ],
    leadership: [
      p(
        'I was the application architect on a team of three. Delivery ran in phases, and each phase added to or changed the requirements. That pushed the design toward one generic permission implementation, carried through to data-level security, in six months.',
      ),
    ],

    architecture: [
      p(
        'Every platform asks one permission service, through an endpoint call, what the client may see. The service returns only the data the client has access to.',
      ),
      {
        _type: 'diagram',
        _key: key('d'),
        asset: imageRef(diagramAssetId),
        alt: DIAGRAM_ALT,
        description: DIAGRAM_DESCRIPTION,
        caption: 'How a permission request is evaluated, most specific level first.',
      },
      h3('How a request is evaluated'),
      p(
        'The levels are checked from most to least specific, and the most specific applicable permission wins. User level always stays in control.',
      ),
      numbered('User level: if set, it overrides every other level.'),
      numbered('User Group level: if set, it overrides every level below it.'),
      numbered(
        'Category: if a category (for example US) is not permitted, the report does not show it, even when the client requests it.',
      ),
      numbered('Stat: the client must have permission for that particular calculation or formula.'),
      numbered(
        'Client Fund and Fund: take the least permissive of the two. If either says No, the answer is No.',
      ),
      numbered('Fund and Portfolio: if both are present, the Fund level takes precedence.'),
      numbered(
        'Portfolio: if a Portfolio permission is set and no further level overrides it, the user gets all of the portfolio’s data.',
      ),
      numbered('Base Profile: the initial level, where the default permissions are given.'),
    ],
    technologyDecisions: [
      {
        _type: 'decisionRecord',
        _key: key('dr'),
        code: 'ADR-01',
        title: 'Store as few permission records as possible',
        context:
          'The data runs to millions of records, and each one has its own level of access.',
        decision:
          'Of the two or three models we considered, we chose the one that reduces the number of records stored.',
      },
      {
        _type: 'decisionRecord',
        _key: key('dr'),
        code: 'ADR-02',
        title: 'Keep the waterfall permission logic in SQL Server',
        context:
          'Requirements kept changing as the work moved through the different applications, and the team’s strongest skills were in SQL Server.',
        decision:
          'The waterfall logic lives in SQL Server. A modification is made in one place, and the services that use it need no deployment for each change.',
        rejected: [
          {
            _type: 'rejectedOption',
            _key: key('r'),
            option: 'A rule engine',
            reason:
              'Development was fast-paced, the developers were more skilled in SQL Server, and the requirements kept changing.',
          },
        ],
      },
      {
        _type: 'decisionRecord',
        _key: key('dr'),
        code: 'ADR-03',
        title: 'Build the Permission UI with generics',
        context:
          'The UI loads Portfolio, Fund, Stat and Category selections, each from the permission API.',
        decision: 'Generic components keep the UI type-safe and avoid casting.',
      },
    ],
    tradeOffs: [
      {
        _type: 'tradeOff',
        _key: key('to'),
        choice: 'Check permissions at eight points in a report’s life',
        gained: 'Access stays correct even if a permission changes while the report is in progress',
        gaveUp: 'Eight permission calls for every report',
      },
    ],
    dataFlow: [
      p('For a single report the permission API is called eight times:'),
      numbered('When the Portfolio dropdown loads in the UI.'),
      numbered('When the Fund dropdown loads.'),
      numbered('When the Stat dropdown loads.'),
      numbered('When the Category dropdown loads.'),
      numbered('When the selection is saved.'),
      numbered('When the request enters the calculation engine.'),
      numbered('After the calculation finishes.'),
      numbered('After the response is formed.'),
      p(
        'Permissions can change at any time, so each stage checks again instead of trusting an earlier answer.',
      ),
    ],
    security: [
      p(
        'Compliance required that an endpoint call returns the necessary data, and only the data the client has access to. Checking again at the calculation engine and on the finished response keeps a change made mid-report from being missed.',
      ),
    ],
    performance: [
      p(
        'To compare the new implementation with the previous ones, we called both endpoints in a parallel loop in .NET and compared the timings. The new one came out roughly four times faster. That was an informal timing comparison, not a formal benchmark.',
      ),
      p(
        'The Permission UI was built with generics, so it is type-safe and needs no casting.',
      ),
    ],
    deployment: [
      p(
        'The waterfall logic is in SQL Server, so a change to a rule is one modification and does not require deploying each consuming service.',
      ),
    ],
    metrics: [
      {
        _type: 'metric',
        _key: key('m'),
        label: 'Permission call time vs the previous implementations',
        after: 'Roughly 4× faster',
        source:
          'Informal timing: both endpoints called in a parallel loop in .NET and the timings compared. Not a formal benchmark.',
      },
    ],
    // "lessons" is required by the schema and is yours to write: Studio blocks publishing until it is filled in.
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

async function query(groq, params = {}, token) {
  const url = new URL(`${API}/data/query/${DATASET}`)
  url.searchParams.set('query', groq)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v))
  const res = await fetch(url, token ? {headers: {Authorization: `Bearer ${token}`}} : undefined)
  if (!res.ok) throw new Error(`Query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

async function uploadSvg(fileName, token) {
  const body = await readFile(here(fileName))
  const url = `${API}/assets/images/${DATASET}?filename=${encodeURIComponent(fileName)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'image/svg+xml', Authorization: `Bearer ${token}`},
    body,
  })
  if (!res.ok) throw new Error(`Upload of ${fileName} failed: ${res.status} ${await res.text()}`)
  return (await res.json()).document._id
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

function check(doc) {
  const problems = []
  if (doc.outcome.length > 140) problems.push(`outcome is ${doc.outcome.length} chars (max 140)`)
  if (doc.summary.length > 240) problems.push(`summary is ${doc.summary.length} chars (max 240)`)
  if (doc.title.length > 80) problems.push(`title is ${doc.title.length} chars (max 80)`)
  if (doc.constraints.length > 5) problems.push(`${doc.constraints.length} constraints (max 5)`)
  if (doc.metrics.length > 4) problems.push(`${doc.metrics.length} metrics (max 4)`)
  return problems
}

async function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const rollback = args.includes('--rollback')

  if (rollback) {
    const existing = await query(`*[_id in [$draft, $published]]{_id}`, {draft: DRAFT_ID, published: PUBLISHED_ID}, apply ? await resolveToken() : undefined)
    const ids = existing.map((d) => d._id)
    console.log(`ROLLBACK ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
    if (ids.includes(PUBLISHED_ID)) {
      console.log(`  ${PUBLISHED_ID} is PUBLISHED: this script never deletes published content. Unpublish it in the Studio first.`)
    }
    if (!ids.includes(DRAFT_ID)) {
      console.log('Nothing to do: there is no draft.')
      return
    }
    console.log(`  delete ${DRAFT_ID}`)
    if (!apply) return console.log('\nDry run only. Add --apply to delete.')
    await mutate([{delete: {id: DRAFT_ID}}], await resolveToken())
    console.log('\nDeleted the draft. The uploaded SVG assets are left in place (unused assets are harmless).')
    return
  }

  const technologies = await query(`*[_type == "technology" && name in $names]{_id, name}`, {names: TECHNOLOGIES})
  const missing = TECHNOLOGIES.filter((name) => !technologies.some((t) => t.name === name))
  if (missing.length) throw new Error(`Technology documents not found: ${missing.join(', ')}`)
  const technologyIds = TECHNOLOGIES.map((name) => technologies.find((t) => t.name === name)._id)

  const exists = await query(`count(*[_id in [$draft, $published]])`, {draft: DRAFT_ID, published: PUBLISHED_ID})
  const doc = buildDocument({heroAssetId: 'image-<hero>', diagramAssetId: 'image-<diagram>', technologyIds})
  const problems = check(doc)

  console.log(`CREATE CASE STUDY ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`  upload permission-levels.svg (hero) and permission-evaluation.svg (diagram)`)
  console.log(`  createIfNotExists ${DRAFT_ID}${exists ? '  (a copy already exists, so it will be left unchanged)' : ''}`)
  console.log(`  title:    ${doc.title}`)
  console.log(`  outcome:  ${doc.outcome} (${doc.outcome.length}/140)`)
  console.log(`  summary:  ${doc.summary.length}/240 chars`)
  console.log(`  sections: problem, context, constraints(${doc.constraints.length}), leadership, architecture, decisions(${doc.technologyDecisions.length}), trade-offs, data flow, security, performance, deployment, metrics(${doc.metrics.length})`)
  console.log(`  technologies: ${TECHNOLOGIES.join(', ')}`)
  console.log(`  NOT set: lessons (required, yours to write), period, SEO`)
  if (problems.length) throw new Error(`Content problems:\n  - ${problems.join('\n  - ')}`)

  if (!apply) return console.log('\nDry run only. Add --apply to write (needs your `sanity login` session or SANITY_AUTH_TOKEN).')

  const token = await resolveToken()
  if (!token) {
    throw new Error(
      '--apply needs a write token: run `npx sanity exec scripts/create-permission-case-study.mjs --with-user-token -- --apply` after `sanity login`, or set SANITY_AUTH_TOKEN',
    )
  }
  const heroAssetId = await uploadSvg('permission-levels.svg', token)
  const diagramAssetId = await uploadSvg('permission-evaluation.svg', token)
  await mutate([{createIfNotExists: buildDocument({heroAssetId, diagramAssetId, technologyIds})}], token)
  console.log(`\nCreated the draft ${DRAFT_ID}. Open the Studio, write "Lessons learned", review, and publish.`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`\n${error.message}`)
    process.exit(1)
  })
}
