import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

export const aboutQuery = defineQuery(`*[_type == "profile"][0]{
  aboutStory,
  portrait{ asset, hotspot, alt, decorative, caption, "lqip": asset->metadata.lqip },
  careerPath[]{ _key, years, role, practice, lesson },
  leadership[]{ _key, title, story }
}`);
export const aboutTags = [tagForType("profile")] as const;
