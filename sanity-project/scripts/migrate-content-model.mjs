#!/usr/bin/env node
/**
 * Phase 3 content migration: legacy model -> new model. Additive only.
 *
 *   node scripts/migrate-content-model.mjs                 dry run (default): prints the plan, writes nothing
 *   node scripts/migrate-content-model.mjs --file x.json   dry run against a backup file instead of the live dataset
 *   node scripts/migrate-content-model.mjs --apply         apply the plan (needs SANITY_AUTH_TOKEN, an Editor token)
 *   node scripts/migrate-content-model.mjs --rollback      dry run of the rollback; add --apply to execute it
 *
 * What it does
 *   - creates `technology` documents from `skill` documents (and four from your brief)
 *   - creates the `profile` and `siteSettings` singletons from `pageInfo` and `social`
 *   - adds new fields (techStack, slug, links) beside the old ones on `experience` and `project`
 * What it never does
 *   - edit or delete a legacy document or field. phoneNumber and address are NOT copied.
 *   - touch isCurrentlyWorkingHere: the new site treats a missing end date as a current role,
 *     as the legacy site does
 *   - overwrite anything that already exists (createIfNotExists, and patches that only fill missing fields)
 */
import {readFileSync} from 'node:fs'
import {pathToFileURL} from 'node:url'

const PROJECT_ID = 'lx7gopy9'
const DATASET = 'production'
const API_VERSION = 'v2025-10-01'
const API = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data`

// ---------------------------------------------------------------- mapping tables

// Display names for the new technology documents (the old skill documents are untouched).
const DISPLAY_NAME = {
  javascript: 'JavaScript',
  node: 'Node.js',
  'mongo db': 'MongoDB',
  'ms sql server': 'SQL Server',
  'express js': 'Express',
  'web api': 'Web API',
}

// Category by (lower-case) legacy skill name. Review these in the Studio.
const CATEGORY = {
  '.net core': 'framework',
  'asp.net': 'framework',
  'asp.net mvc': 'framework',
  bootstrap: 'framework',
  'c#': 'language',
  css: 'language',
  'express js': 'framework',
  graphql: 'language',
  html: 'language',
  javascript: 'language',
  jquery: 'framework',
  knockout: 'framework',
  'material ui': 'framework',
  'mongo db': 'data',
  'ms sql server': 'data',
  node: 'framework',
  oracle: 'data',
  rabbitmq: 'data',
  react: 'framework',
  redis: 'data',
  redux: 'framework',
  'redux-saga': 'framework',
  storybook: 'practice',
  'styled components': 'framework',
  'tailwind css': 'framework',
  typescript: 'language',
  'web api': 'framework',
}

// Listed as primary expertise in the brief but absent from the legacy data.
const FROM_BRIEF = [
  {id: 'technology-nextjs', name: 'Next.js', category: 'framework'},
  {id: 'technology-java', name: 'Java', category: 'language'},
  {id: 'technology-spring-boot', name: 'Spring Boot', category: 'framework'},
  {id: 'technology-postgresql', name: 'PostgreSQL', category: 'data'},
]

// Approved in Decision #10 (headline) and shown on the new home page.
const HEADLINE = 'Engineering systems with discipline.'
const SUBLINE = 'Foundations first. Then speed.'
const SITE_NAME = 'Mathi Sudhanan'
// The address shown on the live contact section; the CMS pageInfo holds a different one.
const PUBLIC_EMAIL = 'mathisudhanan@gmail.com'
const PORTRAIT_ALT = 'Portrait of Mathi Sudhanan'

const PLATFORMS = [
  {host: 'linkedin.com', platform: 'linkedin', title: 'LinkedIn'},
  {host: 'github.com', platform: 'github', title: 'GitHub'},
  {host: 'youtube.com', platform: 'youtube', title: 'YouTube'},
]

// ---------------------------------------------------------------- helpers

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/asp\.net/g, 'aspnet')
    .replace(/\.net/g, 'dotnet')
    .replace(/c#/g, 'csharp')
    .replace(/\.js\b/g, 'js')
    .replace(/\+/g, 'plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const key = (seed) => seed.replace(/[^a-z0-9]/gi, '').slice(0, 12)
const year = (date) => (date ? Number(String(date).slice(0, 4)) : undefined)
const techId = (skillId) => `technology-${skillId}`

function paragraphs(text) {
  return String(text ?? '')
    .split(/\n\s*\n|\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => ({
      _type: 'block',
      _key: `p${i}`,
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: `s${i}`, text: p, marks: []}],
    }))
}

// ---------------------------------------------------------------- the plan

/**
 * @param {object[]} docs all documents in the dataset (asset documents may be omitted)
 * @returns {{mutations: object[], notes: string[], summary: object}}
 */
export function plan(docs) {
  const byId = new Map(docs.map((d) => [d._id, d]))
  const ofType = (type) => docs.filter((d) => d._type === type)
  const exists = (id) => byId.has(id)

  const skills = ofType('skill')
  const experiences = ofType('experience')
  const projects = ofType('project')
  const pageInfo = ofType('pageInfo')[0]
  const socials = ofType('social')

  const mutations = []
  const notes = []
  const summary = {technologiesCreated: 0, technologiesExisting: 0, patches: 0, singletonsCreated: 0}

  // ---- technologies from skills ------------------------------------------
  // Year each skill first appears in an experience (a lower bound, not proof of first use).
  const firstUsed = new Map()
  for (const exp of experiences) {
    const y = year(exp.dateStarted)
    for (const ref of exp.technologies ?? []) {
      if (y && (!firstUsed.has(ref._ref) || y < firstUsed.get(ref._ref))) firstUsed.set(ref._ref, y)
    }
  }

  const usedSlugs = new Set()
  const uniqueSlug = (base) => {
    let slug = base
    for (let n = 2; usedSlugs.has(slug); n += 1) slug = `${base}-${n}`
    usedSlugs.add(slug)
    return slug
  }

  for (const skill of [...skills].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))) {
    const id = techId(skill._id)
    if (exists(id)) {
      summary.technologiesExisting += 1
      usedSlugs.add(byId.get(id).slug?.current)
      continue
    }
    const lower = (skill.name ?? '').toLowerCase()
    const name = DISPLAY_NAME[lower] ?? skill.name
    const category = CATEGORY[lower]
    if (!category) notes.push(`No category mapped for skill "${skill.name}": set it in the Studio.`)
    const doc = {
      _id: id,
      _type: 'technology',
      name,
      slug: {_type: 'slug', current: uniqueSlug(slugify(name))},
      ...(category ? {category} : {}),
      ...(firstUsed.has(skill._id) ? {since: firstUsed.get(skill._id)} : {}),
      featured: false,
      ...(skill.image ? {icon: skill.image} : {}),
    }
    mutations.push({createIfNotExists: doc})
    summary.technologiesCreated += 1
  }

  for (const t of FROM_BRIEF) {
    if (exists(t.id)) {
      summary.technologiesExisting += 1
      continue
    }
    mutations.push({
      createIfNotExists: {
        _id: t.id,
        _type: 'technology',
        name: t.name,
        slug: {_type: 'slug', current: uniqueSlug(slugify(t.name))},
        category: t.category,
        featured: false,
      },
    })
    summary.technologiesCreated += 1
  }
  notes.push(
    'Technologies from your brief (Next.js, Java, Spring Boot, PostgreSQL) have no icon or first-used year: add them in the Studio.',
  )

  // ---- experience: add new fields beside the old ones ---------------------
  for (const exp of experiences) {
    const set = {}
    if (!exp.techStack && exp.technologies?.length) {
      set.techStack = exp.technologies.map((ref) => ({
        _key: key(ref._ref),
        _type: 'reference',
        _ref: techId(ref._ref),
      }))
    }
    if (Object.keys(set).length) {
      mutations.push({patch: {id: exp._id, ifRevisionID: exp._rev, set}})
      summary.patches += 1
    }
  }

  // ---- projects: slug, links, techStack -----------------------------------
  for (const project of projects) {
    const set = {}
    if (!project.slug?.current && project.title) {
      set.slug = {_type: 'slug', current: uniqueSlug(slugify(project.title))}
    }
    if (!project.techStack && project.technologies?.length) {
      set.techStack = project.technologies.map((ref) => ({
        _key: key(ref._ref),
        _type: 'reference',
        _ref: techId(ref._ref),
      }))
    }
    if (!project.links && project.linkToBuild) set.links = {live: project.linkToBuild}
    if (Object.keys(set).length) {
      mutations.push({patch: {id: project._id, ifRevisionID: project._rev, set}})
      summary.patches += 1
    }
  }

  // ---- singletons ---------------------------------------------------------
  if (pageInfo && !exists('profile')) {
    const earliest = Math.min(...experiences.map((e) => year(e.dateStarted)).filter(Boolean))
    const withAlt = (image) => (image ? {...image, alt: PORTRAIT_ALT} : undefined)
    mutations.push({
      createIfNotExists: {
        _id: 'profile',
        _type: 'profile',
        headline: HEADLINE,
        subheadline: SUBLINE,
        ...(Number.isFinite(earliest) ? {startYear: earliest} : {}),
        aboutStory: paragraphs(pageInfo.backgroundInformation),
        ...(pageInfo.profilePic ? {portrait: withAlt(pageInfo.profilePic)} : {}),
        ...(pageInfo.heroImage ? {heroImage: withAlt(pageInfo.heroImage)} : {}),
      },
    })
    summary.singletonsCreated += 1
    notes.push(
      `profile.startYear = ${earliest}, the earliest experience start date. Confirm it.`,
      `profile portrait and hero alt text is the placeholder "${PORTRAIT_ALT}". The hero image is replaced by the photo shoot.`,
      'profile.aboutStory is your current background text, unchanged. Rewrite it as a story in the Studio.',
    )
  }

  if (pageInfo && !exists('siteSettings')) {
    const links = socials
      .filter((s) => typeof s.url === 'string' && s.url.startsWith('https://'))
      .map((s) => {
        const host = new URL(s.url).hostname
        const known = PLATFORMS.find((p) => host === p.host || host.endsWith(`.${p.host}`))
        return {
          _key: key(s._id),
          _type: 'socialLink',
          platform: known?.platform ?? 'other',
          title: known?.title ?? s.title,
          url: s.url,
        }
      })
    mutations.push({
      createIfNotExists: {
        _id: 'siteSettings',
        _type: 'siteSettings',
        name: SITE_NAME,
        email: PUBLIC_EMAIL,
        socials: links,
      },
    })
    summary.singletonsCreated += 1
    if (pageInfo.email && pageInfo.email !== PUBLIC_EMAIL) {
      notes.push(
        `Email: the CMS page info has ${pageInfo.email}, but the live contact section shows ${PUBLIC_EMAIL}. Used the live one. Change it in Site settings if wrong.`,
      )
    }
    if (pageInfo.name && pageInfo.name !== SITE_NAME) {
      notes.push(`Name: the CMS page info has "${pageInfo.name}". Site settings uses "${SITE_NAME}".`)
    }
    notes.push(
      'Not migrated on purpose: phoneNumber and address. They remain in the legacy Page info document; delete them there if you want them gone from the CMS.',
      'Site settings has no availability, location or CV yet: add them in the Studio. Nothing is shown until you do.',
    )
  }

  return {mutations, notes, summary}
}

/** The inverse: delete what the migration created, unset what it added. */
export function rollbackPlan(docs) {
  const mutations = []
  for (const d of docs) {
    if (d._id.startsWith('technology-') || d._id === 'profile' || d._id === 'siteSettings') {
      mutations.push({delete: {id: d._id}})
    }
    if (d._type === 'experience') {
      const unset = ['techStack'].filter((f) => d[f] !== undefined)
      if (unset.length) mutations.push({patch: {id: d._id, unset}})
    }
    if (d._type === 'project') {
      const unset = ['slug', 'techStack', 'links'].filter((f) => d[f] !== undefined)
      if (unset.length) mutations.push({patch: {id: d._id, unset}})
    }
  }
  return {mutations, notes: [], summary: {}}
}

/** Applies mutations to an in-memory copy of the documents (used to prove idempotency). */
export function simulate(docs, mutations) {
  const byId = new Map(docs.map((d) => [d._id, structuredClone(d)]))
  for (const m of mutations) {
    if (m.createIfNotExists && !byId.has(m.createIfNotExists._id)) {
      byId.set(m.createIfNotExists._id, structuredClone(m.createIfNotExists))
    } else if (m.delete) {
      byId.delete(m.delete.id)
    } else if (m.patch) {
      const d = byId.get(m.patch.id)
      Object.assign(d, structuredClone(m.patch.set ?? {}))
      for (const f of m.patch.unset ?? []) delete d[f]
      d._rev = `${d._rev}-patched`
    }
  }
  return [...byId.values()]
}

// ---------------------------------------------------------------- IO

async function loadDocs(file) {
  if (file) {
    const json = JSON.parse(readFileSync(file, 'utf8'))
    return json.result ?? json
  }
  const query = '*[!(_type match "system.*") && !(_type match "sanity.*")]'
  const headers = process.env.SANITY_AUTH_TOKEN ? {Authorization: `Bearer ${process.env.SANITY_AUTH_TOKEN}`} : {}
  const res = await fetch(`${API}/query/${DATASET}?query=${encodeURIComponent(query)}`, {headers})
  if (!res.ok) throw new Error(`Could not read the dataset: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

function describe(m) {
  if (m.createIfNotExists) {
    const d = m.createIfNotExists
    return `create  ${d._type.padEnd(13)} ${d._id}${d.name ? `  (${d.name})` : ''}`
  }
  if (m.patch) {
    const fields = Object.keys(m.patch.set ?? {}).concat((m.patch.unset ?? []).map((f) => `-${f}`))
    return `patch   ${m.patch.id}  [${fields.join(', ')}]`
  }
  return `delete  ${m.delete.id}`
}

async function main() {
  const args = process.argv.slice(2)
  const file = args.includes('--file') ? args[args.indexOf('--file') + 1] : undefined
  const apply = args.includes('--apply')
  const rollback = args.includes('--rollback')

  const docs = await loadDocs(file)
  const {mutations, notes, summary} = rollback ? rollbackPlan(docs) : plan(docs)

  console.log(`${rollback ? 'ROLLBACK' : 'MIGRATION'} ${apply ? '(applying)' : '(dry run: nothing is written)'}`)
  console.log(`source: ${file ?? `${PROJECT_ID}/${DATASET}`}, ${docs.length} documents read\n`)
  if (!mutations.length) {
    console.log('Nothing to do.')
    return
  }
  for (const m of mutations) console.log(`  ${describe(m)}`)
  console.log(`\n${mutations.length} mutations`, Object.keys(summary).length ? JSON.stringify(summary) : '')
  if (notes.length) console.log(`\nReview:\n${notes.map((n) => `  - ${n}`).join('\n')}`)

  if (!apply) {
    console.log('\nDry run only. Re-run with --apply to write (needs SANITY_AUTH_TOKEN).')
    return
  }
  const token = process.env.SANITY_AUTH_TOKEN
  if (!token) throw new Error('--apply needs SANITY_AUTH_TOKEN (an Editor token or your CLI auth token)')
  const res = await fetch(`${API}/mutate/${DATASET}?returnIds=true&visibility=sync`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    body: JSON.stringify({mutations}),
  })
  const body = await res.text()
  if (!res.ok) throw new Error(`Write failed, nothing was changed (single transaction): ${res.status} ${body}`)
  console.log(`\nApplied. ${JSON.parse(body).results?.length ?? mutations.length} results.`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`\n${error.message}`)
    process.exit(1)
  })
}
