import { defineQuery } from "next-sanity";
import { tagForType } from "@/lib/sanity/tags";

// Newest first. A current role has no end date, so it sorts above every finished one;
// among current roles the one that started later comes first.
export const experienceQuery = defineQuery(`*[_type == "experience"] | order(coalesce(dateEnded, "9999-12-31") desc, dateStarted desc){
  _id,
  jobTitle,
  company,
  location,
  dateStarted,
  dateEnded,
  isCurrentlyWorkingHere,
  summary,
  points,
  teamSize,
  "techStack": techStack[]->name
}`);
export const experienceTags = [tagForType("experience"), tagForType("technology")] as const;
