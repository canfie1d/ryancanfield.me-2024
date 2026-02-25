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

const S3_BASE = "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images";
const CLOUDFRONT_BASE = process.env.VITE_IMAGE_CDN_URL ?? "https://d2b4ewtpli0u9y.cloudfront.net";

function toCloudFrontUrl(s3Url: string): string {
  if (s3Url.startsWith(S3_BASE)) {
    return s3Url.replace(S3_BASE, CLOUDFRONT_BASE);
  }
  return s3Url;
}

type ArticleDoc = {
  _id: string;
  _type: string;
  title?: string;
  description?: string;
  url?: string;
  length?: string;
  order?: number;
  imageUrl?: string;
  image?: { _type: string; asset: { _type: string; _ref: string } };
};

async function main() {
  // Phase 1: Migrate articles with imageUrl but no image (upload + createOrReplace)
  const toMigrate = await client.fetch<ArticleDoc[]>(
    `*[_type in ["article", "articleLink"] && defined(imageUrl) && !defined(image)] { _id, _type, title, description, url, length, order, imageUrl }`
  );

  // Phase 2: Republish articles that have image (patch may have created drafts - createOrReplace makes them visible)
  const toRepublish = await client.fetch<ArticleDoc[]>(
    `*[_type in ["article", "articleLink"] && defined(imageUrl) && defined(image)] { _id, _type, title, description, url, length, order, imageUrl, image }`
  );

  console.log(`Found ${toMigrate.length} articles to migrate, ${toRepublish.length} to republish`);

  for (const article of toMigrate) {
    if (!article.imageUrl) continue;

    const fetchUrl = toCloudFrontUrl(article.imageUrl);
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      console.warn(`Failed to fetch ${fetchUrl} for "${article.title}" (HTTP ${res.status})`);
      continue;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = path.basename(new URL(article.imageUrl).pathname);
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });

    const image = { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
    // Use createOrReplace to update published doc directly (patch can create drafts that aren't visible to reads)
    await client.createOrReplace({
      ...article,
      image,
    });

    console.log(`Migrated: ${article.title}`);
  }

  for (const article of toRepublish) {
    // createOrReplace ensures the published doc has the image (fixes draft visibility)
    await client.createOrReplace(article);
    console.log(`Republished: ${article.title}`);
  }

  console.log(`Done. Migrated ${toMigrate.length}, republished ${toRepublish.length} article images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
