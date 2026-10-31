import { defineQuery } from "next-sanity";
import { tagForType } from "./tags";

// Typed by `npm run typegen` (see src/sanity.types.ts). Always project explicit
// fields: `...` would ship every field, including ones that should stay private.
// Feature-specific queries live next to their feature (src/features/*/queries.ts).

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  name,
  email,
  location,
  availability,
  socials[]{ _key, platform, title, url },
  "cvUrl": cvFile.asset->url
}`);
export const siteSettingsTags = [tagForType("siteSettings")] as const;
