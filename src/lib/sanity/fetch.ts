import "server-only";
import type { ClientReturn, QueryParams } from "next-sanity";
import { client } from "./client";
import type { SanityTag } from "./tags";

// The webhook revalidates tags immediately; this is the safety net if the
// webhook is misconfigured or a delivery is lost.
const FALLBACK_REVALIDATE_SECONDS = 60 * 60;

type SanityFetchOptions<Query extends string> = {
  query: Query;
  params?: QueryParams;
  tags: readonly SanityTag[];
};

export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: SanityFetchOptions<Query>): Promise<ClientReturn<Query>> {
  return client.fetch(query, params, {
    next: { revalidate: FALLBACK_REVALIDATE_SECONDS, tags: [...tags] },
  });
}
