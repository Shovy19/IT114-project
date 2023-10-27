import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "2yduhvqu",
  dataset: "production",
  apiVersion: "2023-10-10",
  useCdn: true,
});
