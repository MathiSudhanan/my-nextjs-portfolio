import "server-only";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  caseStudyIndexQuery,
  caseStudyQuery,
  caseStudySlugsQuery,
  caseStudyTags,
} from "./queries";
import { SAMPLE_SLUG, sampleCaseStudy, sampleIndexEntry } from "./sample";

// The sample case study appears everywhere except production, so the template can be
// reviewed before real content exists. It is never written to Sanity.
const showSample = process.env.VERCEL_ENV !== "production";

export async function getCaseStudies() {
  const studies = await sanityFetch({ query: caseStudyIndexQuery, tags: caseStudyTags });
  return showSample ? [...studies, sampleIndexEntry] : studies;
}

export async function getCaseStudySlugs() {
  const slugs = await sanityFetch({ query: caseStudySlugsQuery, tags: caseStudyTags });
  return showSample ? [...slugs, SAMPLE_SLUG] : slugs;
}

export async function getCaseStudy(slug: string) {
  if (showSample && slug === SAMPLE_SLUG) return sampleCaseStudy;
  return sanityFetch({ query: caseStudyQuery, params: { slug }, tags: caseStudyTags });
}
