import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2021-10-21",
  useCdn: process.env.NODE_ENV === "production",
  token:
    "skVxkfx3egQAyPF5haRaAqK3LvWdOGcVmXCdmtmCyGAw7ocGPIH2pzAeb06qyGNxZfyX6tvsXqkLz2CgpzGRTfRMcpc59dslnR2vGYPWZ0b1qCmwaWFFVNbpZehFsOXgj3L8pffFQDgqk5vQe0rlKPe532QYccgQ2f5T9Tt5lGLJc7CgWzI3",
};
console.log(`dataset: ${config.dataset}, Project: ${config.projectId}`);
export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
