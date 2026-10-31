import "server-only";
import { createClient } from "next-sanity";
import { sanityEnv } from "@/lib/env";

// Server-only: importing this module from a client component fails the build.
// The dataset is public-read, so no token is configured. If the dataset is ever
// made private, add a read token here from a server-only environment variable.
export const client = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  perspective: "published",
});
