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

// Find the services singleton (draft takes priority if present).
const doc =
  (await client.fetch(`*[_type == "services" && _id in path("drafts.**")][0]`)) ||
  (await client.fetch(`*[_type == "services"][0]`));

if (!doc) {
  console.error("No 'services' document found.");
  process.exit(1);
}

const servicesList = doc.servicesList ?? [];
let changed = false;

for (const item of servicesList) {
  const ref = item.featuredProject?._ref;
  if (!ref) continue;
  const project = await client.fetch(`*[_id == $ref][0]{title, mainImage}`, { ref });
  if (!project) {
    console.warn("Referenced project not found for service", item.number, ref);
    continue;
  }
  if (project.mainImage) {
    item.featuredImage = project.mainImage;
  }
  if (project.title) {
    item.featuredTitle = { en: project.title, es: project.title };
  }
  delete item.featuredProject;
  changed = true;
  console.log("Migrated service", item.number, "<-", project.title);
}

if (!changed) {
  console.log("Nothing to migrate.");
  process.exit(0);
}

await client.patch(doc._id).set({ servicesList }).commit();
console.log("DONE — patched", doc._id);
