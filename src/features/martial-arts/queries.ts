import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

export const martialArtsQuery = defineQuery(`{
  "intro": *[_type == "profile"][0].martialArtsIntro,
  "arts": *[_type == "martialArt" && defined(slug.current)] | order(order asc, startYear asc){
    _id,
    name,
    nativeName,
    startYear,
    school,
    summary,
    whatItDemands,
    whatItTaught,
    engineeringParallel,
    gallery[]{ _key, asset, hotspot, alt, decorative, caption, credit, "lqip": asset->metadata.lqip }
  }
}`);
export const martialArtsTags = [tagForType("martialArt"), tagForType("profile")] as const;
