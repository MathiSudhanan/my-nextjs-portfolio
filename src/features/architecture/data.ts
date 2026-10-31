import "server-only";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  caseStudyIndexQuery,
  caseStudyQuery,
  caseStudySlugsQuery,
  caseStudyTags,
} from "./queries";

export function getCaseStudies() {
  return sanityFetch({ query: caseStudyIndexQuery, tags: caseStudyTags });
}

export function getCaseStudySlugs() {
  return sanityFetch({ query: caseStudySlugsQuery, tags: caseStudyTags });
}

export function getCaseStudy(slug: string) {
  return sanityFetch({ query: caseStudyQuery, params: { slug }, tags: caseStudyTags });
}
