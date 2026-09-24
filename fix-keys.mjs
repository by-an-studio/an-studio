import { createClient } from "@sanity/client";
import fs from "fs";
import crypto from "crypto";

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

function genKey() {
  return crypto.randomBytes(6).toString("hex");
}

// Recursively walk an object/array tree and add a `_key` to every array item
// that's a plain object and doesn't already have one.
function addKeys(node) {
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        if (!("_key" in item)) {
          item._key = genKey();
        }
      }
      addKeys(item);
    }
  } else if (node && typeof node === "object") {
    for (const key of Object.keys(node)) {
      addKeys(node[key]);
    }
  }
}

const slugs = [
  "sorauni",
  "zimo-creative",
  "sb-joaillerie",
  "marea-de-sicilia",
  "sunbase",
  "la-merceria-de-yoya",
  "rocco-s",
  "coprinello",
];

for (const slug of slugs) {
  const doc = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  );
  if (!doc) {
    console.error("Not found:", slug);
    continue;
  }
  addKeys(doc);
  try {
    await client.createOrReplace(doc);
    console.log("Fixed keys:", doc._id, "(slug:", slug + ")");
  } catch (err) {
    console.error("Failed:", doc._id, err.message);
  }
}
console.log("DONE");
