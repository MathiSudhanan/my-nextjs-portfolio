import "server-only";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  homeFactsQuery,
  homeFactsTags,
  homeProfileQuery,
  homeProfileTags,
} from "./queries";

export async function getHomeData() {
  const [profile, facts] = await Promise.all([
    sanityFetch({ query: homeProfileQuery, tags: homeProfileTags }),
    sanityFetch({ query: homeFactsQuery, tags: homeFactsTags }),
  ]);

  if (!profile) {
    // The profile singleton is required content: fail the build loudly rather than
    // publish a home page with no headline.
    throw new Error('Sanity has no "profile" document. Create it in the Studio.');
  }

  const yearsOfExperience = new Date().getFullYear() - profile.startYear;
  return {
    profile,
    // A dangling reference resolves to null; drop those.
    featured: (profile.featured ?? []).filter((study) => study !== null),
    organisations: facts.organisations,
    // "21 years" is shown as "20+ years": a round, defensible floor.
    yearsLabel: `${Math.floor(yearsOfExperience / 5) * 5}+ years`,
  };
}
