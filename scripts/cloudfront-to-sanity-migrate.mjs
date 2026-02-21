#!/usr/bin/env node
/**
 * Migrates images to Sanity and patches project/caseStudy documents.
 *
 * Mode 1 - From CloudFront (set VITE_IMAGE_CDN_URL in .env.local to your CloudFront domain):
 *   node scripts/cloudfront-to-sanity-migrate.mjs
 *
 * Mode 2 - From local folder (if CloudFront returns 403, download images first):
 *   node scripts/cloudfront-to-sanity-migrate.mjs --from-dir=./cloudfront-images
 *   (Place images in cloudfront-images/ preserving paths: FreightWeb/, Xinova/, Ocean/, etc.)
 *
 * Options:
 *   --no-patch   Upload only; skip patching documents with new URLs
 *
 * Requires: SANITY_AUTH_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch (e) {
  console.error("Could not load .env.local:", e.message);
  process.exit(1);
}

const projectId = process.env.VITE_SANITY_PROJECT_ID || "8tzt6p0y";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error("SANITY_AUTH_TOKEN is required in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-20",
  token,
  useCdn: false,
});

const FROM_DIR = process.argv.find((a) => a.startsWith("--from-dir="))?.split("=")[1];
const NO_PATCH = process.argv.includes("--no-patch");
const CLOUDFRONT_BASE = process.env.VITE_IMAGE_CDN_URL || "https://d2b4ewtpli0u9y.cloudfront.net";
const S3_BASE = "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images";

const IMAGES = [
  // FreightWeb
  { path: "FreightWeb/tmw_5.png", label: "FreightWeb problem UI" },
  { path: "FreightWeb/shipment_dashboard_design.png", label: "FreightWeb shipment dashboard" },
  { path: "FreightWeb/trip_list_wide.png", label: "FreightWeb trip list" },
  { path: "FreightWeb/auction_bids_2.png", label: "FreightWeb auction bids" },
  { path: "FreightWeb/add_shipment_1.png", label: "FreightWeb add shipment" },
  { path: "FreightWeb/add_auction.png", label: "FreightWeb add auction" },
  { path: "FreightWeb/carrier_profile.png", label: "FreightWeb carrier profile" },
  { path: "FreightWeb/driver_hub_trip.png", label: "FreightWeb driver hub trip" },
  { path: "FreightWeb/HelloFuel_DriverHub_Flow.png", label: "FreightWeb driver hub flow" },
  { path: "FreightWeb/fw_poster.png", label: "FreightWeb video poster" },
  { path: "FreightWeb/truck-on-mountain-road.jpg", label: "FreightWeb hero" },
  // Xinova
  { path: "Xinova/xinova_poster.png", label: "Xinova poster" },
  { path: "Xinova/submit_2.png", label: "Xinova submit" },
  { path: "Xinova/rfx.png", label: "Xinova rfx" },
  { path: "Xinova/projects.png", label: "Xinova projects" },
  { path: "Xinova/solutions.png", label: "Xinova solutions" },
  { path: "Xinova/xinova_map.png", label: "Xinova map" },
  // Ocean / Princess
  { path: "Ocean/chat_home.png", label: "Ocean chat home" },
  { path: "Ocean/chat_home_half.png", label: "Ocean chat home half" },
  { path: "Ocean/conversation.png", label: "Ocean conversation" },
  { path: "Ocean/full_open_selected_pp.png", label: "Ocean full open" },
  { path: "Ocean/messages.png", label: "Ocean messages" },
  { path: "Ocean/mini_open_selected.png", label: "Ocean mini open" },
  { path: "Ocean/ocean_poster.png", label: "Ocean video poster" },
  { path: "Ocean/ocean-thumb.png", label: "Ocean thumb" },
  // Article links
  { path: "Link+Images/shopify-react.png", label: "Shopify React" },
  { path: "Link+Images/tobythealien.jpg", label: "Toby the alien" },
  { path: "Link+Images/svg-rollup.png", label: "SVG Rollup" },
  { path: "Link+Images/user-consideration.png", label: "User consideration" },
  { path: "Link+Images/react-scripts.png", label: "React scripts" },
  { path: "Link+Images/icons.png", label: "Icons" },
  { path: "Link+Images/sketch.png", label: "Sketch" },
  { path: "Link+Images/code.png", label: "Code" },
  // CodePens
  { path: "codepens/expanding_hamburger.png", label: "Expanding hamburger" },
  { path: "codepens/genie_nav.png", label: "Genie nav" },
  { path: "codepens/3d_form.png", label: "3D form" },
  { path: "codepens/bottom_nav.png", label: "Bottom nav" },
  { path: "codepens/tooltip.png", label: "Tooltip" },
  { path: "codepens/mini_menu.png", label: "Mini menu" },
  { path: "codepens/blur_modal.png", label: "Blur modal" },
  { path: "codepens/chat_bubbles.png", label: "Chat bubbles" },
];

async function uploadFromUrl(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function uploadFromFile(filePath, filename) {
  const buffer = readFileSync(filePath);
  return client.assets.upload("image", buffer, { filename });
}

async function main() {
  const mapping = {};
  let ok = 0;
  let fail = 0;

  if (FROM_DIR) {
    const dir = resolve(process.cwd(), FROM_DIR);
    if (!existsSync(dir)) {
      console.error(`Directory not found: ${dir}`);
      process.exit(1);
    }
    console.log(`Uploading from local dir: ${dir}\n`);
  } else {
    console.log(`Fetching from CloudFront and uploading ${IMAGES.length} images to Sanity...\n`);
  }

  for (const { path } of IMAGES) {
    const cloudfrontUrl = `${CLOUDFRONT_BASE}/${path}`;
    const s3Url = `${S3_BASE}/${path}`;
    const filename = path.split("/").pop();
    try {
      let asset;
      if (FROM_DIR) {
        const filePath = join(resolve(process.cwd(), FROM_DIR), path);
        if (!existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
        }
        asset = await uploadFromFile(filePath, filename);
      } else {
        asset = await uploadFromUrl(cloudfrontUrl, filename);
      }
      mapping[cloudfrontUrl] = asset.url;
      mapping[s3Url] = asset.url;
      console.log(`✓ ${filename} → ${asset.url}`);
      ok++;
    } catch (err) {
      console.error(`✗ ${filename}: ${err.message}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone: ${ok} uploaded, ${fail} failed`);

  if (Object.keys(mapping).length > 0) {
    console.log("\nCloudFront URL → Sanity CDN URL mapping:");
    console.log(JSON.stringify(mapping, null, 2));

    if (NO_PATCH) {
      console.log(
        "\nSkipping document patch (--no-patch). Run without --no-patch to update documents.",
      );
      return;
    }

    console.log("\nPatching Sanity documents to use Sanity image URLs...");

    // Patch projects
    const projects = await client.fetch(`*[_type == "project" && defined(image)]{ _id, image }`);
    for (const doc of projects) {
      const newUrl = mapping[doc.image];
      if (newUrl) {
        await client.patch(doc._id).set({ image: newUrl }).commit();
        console.log(`  ✓ project "${doc._id}" image updated`);
      }
    }

    // Patch caseStudies (problem, solution, result images + videoPoster)
    const caseStudies = await client.fetch(
      `*[_type == "caseStudy"]{ _id, title, problem, solution, result, additionalImages, videoPoster }`,
    );
    for (const doc of caseStudies) {
      const patches = {};
      const replaceUrl = (url) => mapping[url] ?? url;

      if (doc.problem?.images) {
        patches["problem.images"] = doc.problem.images.map((img) => ({
          ...img,
          src: replaceUrl(img.src),
        }));
      }
      if (doc.solution?.images) {
        patches["solution.images"] = doc.solution.images.map((img) => ({
          ...img,
          src: replaceUrl(img.src),
        }));
      }
      if (doc.result?.images) {
        patches["result.images"] = doc.result.images.map((img) => ({
          ...img,
          src: replaceUrl(img.src),
        }));
      }
      if (doc.additionalImages) {
        patches["additionalImages"] = doc.additionalImages.map((img) => ({
          ...img,
          src: replaceUrl(img.src),
        }));
      }
      if (doc.videoPoster && mapping[doc.videoPoster]) {
        patches["videoPoster"] = mapping[doc.videoPoster];
      }

      if (Object.keys(patches).length > 0) {
        await client.patch(doc._id).set(patches).commit();
        console.log(`  ✓ caseStudy "${doc.title}" updated`);
      }
    }

    console.log("\nDocument patching complete.");
    console.log("Publish the updated drafts in Sanity Studio to make changes live.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
