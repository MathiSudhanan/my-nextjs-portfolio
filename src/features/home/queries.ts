import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

export const homeProfileQuery = defineQuery(`*[_type == "profile"][0]{
  headline,
  subheadline,
  positioning,
  startYear,
  heroImage{ asset, hotspot, alt, decorative, "lqip": asset->metadata.lqip },
  careerPath[]{ _key, years, role, practice, lesson },
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

// Only quotes the person has given written permission to publish.
export const homeTestimonialsQuery = defineQuery(`*[_type == "testimonial" && permission == true][0...2]{
  _id,
  quote,
  name,
  role,
  company
}`);
export const homeTestimonialsTags = [tagForType("testimonial")] as const;

export const homeArticlesQuery = defineQuery(`{
  "total": count(*[_type == "article" && defined(slug.current)]),
  "latest": *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    kind,
    publishedAt
  }
}`);
export const homeArticlesTags = [tagForType("article")] as const;
