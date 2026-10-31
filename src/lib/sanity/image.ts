import { sanityEnv } from "@/lib/env";

/** The parts of a Sanity image value the site needs. Matches the generated types. */
export type SanityImageValue = {
  asset?: { _ref?: string } | null;
  hotspot?: { x: number; y: number } | null;
  alt?: string | null;
  decorative?: boolean | null;
  lqip?: string | null;
};

// An image reference looks like: image-<hash>-<width>x<height>-<format>
const REF = /^image-([a-f0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/;

export type ResolvedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  objectPosition?: string;
};

/**
 * Turns a Sanity image value into props for `next/image`. Returns null when the
 * value has no asset, so callers can skip rendering. Alt text is "" for decorative
 * images and when none was provided (the schema requires one, so this is a fallback).
 */
export function resolveImage(image: SanityImageValue | null | undefined): ResolvedImage | null {
  const match = image?.asset?._ref ? REF.exec(image.asset._ref) : null;
  if (!image || !match) return null;
  const [, hash, width, height, format] = match;
  return {
    src: `https://cdn.sanity.io/images/${sanityEnv.projectId}/${sanityEnv.dataset}/${hash}-${width}x${height}.${format}`,
    width: Number(width),
    height: Number(height),
    alt: image.decorative ? "" : (image.alt ?? ""),
    ...(image.lqip ? { blurDataURL: image.lqip } : {}),
    ...(image.hotspot
      ? { objectPosition: `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%` }
      : {}),
  };
}
