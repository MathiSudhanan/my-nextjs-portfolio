import type { ImageLoaderProps } from "next/image";

// Global loader for next/image (see next.config.js). Sanity's image CDN does the
// resizing and format negotiation, so images never go through Vercel's optimiser.
// Every image on this site is a Sanity image; anything else is returned untouched.
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
}
