import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityEnv } from "@/lib/env";

const builder = createImageUrlBuilder({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
});

// Always set a width (and let Sanity pick the format) when rendering:
//   urlFor(source).width(640).auto("format").url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
