import article from './documents/article'
import caseStudy from './documents/caseStudy'
import certification from './documents/certification'
import experience from './documents/experience'
import martialArt from './documents/martialArt'
import pageInfo from './documents/pageInfo'
import profile from './documents/profile'
import project from './documents/project'
import siteSettings from './documents/siteSettings'
import skill from './documents/skill'
import social from './documents/social'
import technology from './documents/technology'
import testimonial from './documents/testimonial'
import {callout, codeSnippet, decisionRecord, metric, richText, tradeOff} from './objects/blocks'
import {seo} from './objects/seo'

// Documents with exactly one instance, created by id (see structure.ts).
export const singletonTypes = ['siteSettings', 'profile'] as const

// Read by the current live site only. Hidden from "create new" so no new content
// goes into them; removed after the new site launches.
export const legacyTypes = ['pageInfo', 'skill', 'social'] as const

export const schemaTypes = [
  // Singletons
  siteSettings,
  profile,
  // Content
  caseStudy,
  project,
  experience,
  technology,
  martialArt,
  article,
  certification,
  testimonial,
  // Legacy
  pageInfo,
  skill,
  social,
  // Objects
  seo,
  richText,
  decisionRecord,
  tradeOff,
  metric,
  callout,
  codeSnippet,
]
