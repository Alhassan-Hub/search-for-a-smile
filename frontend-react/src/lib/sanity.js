import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "2lcrk78r", // Find this in your new Sanity project
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-12-30",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);