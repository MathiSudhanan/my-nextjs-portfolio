import type { MetadataRoute } from "next";
import { caseStudySitemapQuery, caseStudyTags } from "@/features/architecture/queries";
import { routes } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await sanityFetch({ query: caseStudySitemapQuery, tags: caseStudyTags });

  // Only routes that exist: the home page plus every route switched on in navigation.
  const pages = [
    { path: "/", priority: 1 },
    ...Object.values(routes)
      .filter((route) => route.live)
      .map((route) => ({ path: route.href, priority: 0.8 })),
  ];

  return [
    ...pages.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`${routes.architecture.href}/${study.slug}`),
      lastModified: study._updatedAt,
      priority: 0.7,
    })),
  ];
}
