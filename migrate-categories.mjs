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

// Every project doc (draft or published) that still has the old single
// `category` string field and no `categories` array yet.
const docs = await client.fetch(
  `*[_type == "project" && defined(category) && !defined(categories)]{_id, title, category}`
);

if (docs.length === 0) {
  console.log("Nothing to migrate — all projects already use 'categories'.");
  process.exit(0);
}

const tx = client.transaction();
for (const doc of docs) {
  tx.patch(doc._id, (p) => p.set({ categories: [doc.category] }).unset(["category"]));
  console.log("Migrating", doc._id, "(", doc.title, ") ->", [doc.category]);
}
await tx.commit();
console.log("DONE —", docs.length, "project(s) migrated.");
