import { createClient } from "@sanity/client";
import fs from "fs";

const envPath = process.argv[2] || ".env.local";
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^"(.*)"$/, "$1");
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function ls(en, es) {
  return { en, es };
}

const patches = {
  "drafts.project-003-sorauni": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Packaging", "Packaging") },
  "drafts.project-004-zimo-creative": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Creative Direction", "Dirección creativa") },
  "drafts.project-006-sb-joaillerie": { imageTag1: ls("Brand World", "Brand World"), imageTag2: ls("Web Design", "Diseño web") },
  "drafts.project-008-marea-de-sicilia": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Creative Direction", "Dirección creativa") },
  "drafts.project-009-sunbase": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Product Design", "Diseño de producto") },
  "drafts.project-010-la-merceria-de-yoya": { imageTag1: ls("Brand World", "Brand World"), imageTag2: ls("Packaging", "Packaging") },
  "drafts.project-013-rocco-s": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Product Design", "Diseño de producto") },
  "drafts.project-014-coprinello": { imageTag1: ls("Brand Identity", "Identidad de marca"), imageTag2: ls("Product Design", "Diseño de producto") },
};

for (const [id, fields] of Object.entries(patches)) {
  try {
    await client.patch(id).set(fields).commit();
    console.log("Patched:", id);
  } catch (err) {
    console.error("Failed:", id, err.message);
  }
}
console.log("DONE");
