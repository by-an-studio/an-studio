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

const URL = "https://www.instagram.com/wavehellostudio/";

// Match both drafts and published projects whose collaboration (EN or ES) is
// "Wave Hello Studio".
const docs = await client.fetch(
  `*[_type == "project" && (collaboration.en == "Wave Hello Studio" || collaboration.es == "Wave Hello Studio")]{_id, title}`
);

if (docs.length === 0) {
  console.log("No projects found with collaboration = 'Wave Hello Studio'.");
  process.exit(0);
}

const tx = client.transaction();
for (const doc of docs) {
  tx.patch(doc._id, (p) => p.set({ collaborationUrl: URL }));
  console.log("Setting collaborationUrl on", doc._id, "(", doc.title, ")");
}
await tx.commit();
console.log("DONE —", docs.length, "project(s) updated.");
