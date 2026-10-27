import { defineQuery } from "next-sanity";
import { tagForType } from "./tags";

// Typed by `npm run typegen` (see src/sanity.types.ts). Always project explicit
// fields: `...` would ship every field, including ones that should stay private.
// These two mirror the current schemas; Phase 3 replaces them with the new model.

export const pageInfoQuery = defineQuery(`*[_type == "pageInfo"][0]{
  _id,
  name,
  role,
  email,
  backgroundInformation,
  heroImage,
  profilePic
}`);
export const pageInfoTags = [tagForType("pageInfo")] as const;

export const experiencesQuery = defineQuery(`*[_type == "experience"] | order(dateStarted desc){
  _id,
  jobTitle,
  company,
  companyImage,
  dateStarted,
  dateEnded,
  isCurrentlyWorkingHere,
  points,
  "technologies": technologies[]->{ _id, name, image }
}`);
export const experiencesTags = [tagForType("experience"), tagForType("skill")] as const;

export const socialsQuery = defineQuery(`*[_type == "social"] | order(title asc){
  _id,
  title,
  url
}`);
export const socialsTags = [tagForType("social")] as const;

// New content model (Phase 3). Pages adopt these in Phases 4-7.

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  name,
  email,
  location,
  availability,
  socials[]{ _key, platform, title, url }
}`);
export const siteSettingsTags = [tagForType("siteSettings")] as const;

export const profileQuery = defineQuery(`*[_type == "profile"][0]{
  headline,
  subheadline,
  positioning,
  startYear,
  aboutStory,
  leadership,
  martialArtsIntro,
  portrait,
  heroImage
}`);
export const profileTags = [tagForType("profile")] as const;
