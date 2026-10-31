import type { MetadataRoute } from "next";
import { absoluteUrl, isProduction } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Previews and local builds are closed to crawlers.
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/design-system/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
