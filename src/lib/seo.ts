import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * True only on the production deployment. Preview and local builds must not be indexed,
 * or a staging copy of the portfolio would compete with the real one in search results.
 */
export const isProduction = process.env.VERCEL_ENV === "production";

/** An absolute URL on this site, for sitemaps and structured data. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

/** The person this portfolio describes, as schema.org structured data. */
export function personSchema(sameAs: readonly string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: absoluteUrl("/"),
    knowsAbout: ["Software architecture", ".NET", "Java", "Spring Boot", "React", "Next.js", "TypeScript"],
    ...(sameAs.length ? { sameAs: [...sameAs] } : {}),
  };
}

/**
 * Title, description, canonical URL and social tags for a page. A page that sets
 * `openGraph` replaces the layout's whole object, so everything is repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: site.name, title: `${title} | ${site.name}`, description, url: path },
  };
}
