/**
 * Uploads article images from external URLs to Sanity and patches documents.
 * Run with: npx tsx scripts/migrate-article-images.ts
 */

import "dotenv/config";
import { createClient } from "@sanity/client";
import path from "path";

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET ?? "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN ?? "";

if (!projectId) {
  console.error("Missing VITE_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function main() {
  const articles = await client.fetch<{ _id: string; title: string; imageUrl?: string }[]>(
    `*[_type == "article" && defined(imageUrl) && !defined(image)] { _id, title, imageUrl }`
  );

  if (articles.length === 0) {
    return;
  }

  for (const article of articles) {
    if (!article.imageUrl) continue;

    const res = await fetch(article.imageUrl);
    if (!res.ok) {
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = path.basename(new URL(article.imageUrl).pathname);
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });

    await client
      .patch(article._id)
      .set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
