import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

export const homeProfileQuery = defineQuery(`*[_type == "profile"][0]{
  headline,
  subheadline,
  positioning,
  startYear,
  heroImage{ asset, hotspot, alt, decorative, "lqip": asset->metadata.lqip },
  "featured": featuredCaseStudies[]->{
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
  }
}`);
export const homeProfileTags = [tagForType("profile"), tagForType("caseStudy"), tagForType("technology")] as const;

export const homeFactsQuery = defineQuery(`{
  "organisations": count(array::unique(*[_type == "experience" && defined(company)].company))
}`);
export const homeFactsTags = [tagForType("experience")] as const;
