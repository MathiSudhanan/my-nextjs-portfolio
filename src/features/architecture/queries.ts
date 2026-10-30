import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

export const caseStudyIndexQuery = defineQuery(`*[_type == "caseStudy" && defined(slug.current)] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  outcome,
  summary,
  domain,
  role,
  period,
  teamSize,
  heroImage{ asset, hotspot, alt, decorative, "lqip": asset->metadata.lqip },
  "techStack": techStack[]->name
}`);

export const caseStudySlugsQuery = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)].slug.current`,
);

// Rich text sections are projected whole: their block and image fields are the content.
export const caseStudyQuery = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  outcome,
  summary,
  role,
  domain,
  period,
  duration,
  teamSize,
  confidential,
  heroImage{ asset, hotspot, alt, decorative, caption, "lqip": asset->metadata.lqip },
  "techStack": techStack[]->name,
  problem,
  context,
  constraints,
  leadership,
  architecture,
  technologyDecisions,
  tradeOffs,
  dataFlow,
  security,
  scalability,
  performance,
  deployment,
  metrics,
  lessons,
  seo{ metaTitle, metaDescription, noIndex }
}`);

export const caseStudyTags = [tagForType("caseStudy"), tagForType("technology")] as const;
