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

const WAVE_URL = "https://www.instagram.com/wavehellostudio/";
const RAVAGE_URL = "https://www.instagram.com/studioravage/";
const RAVAGE_NAME = "Ravageadam Design Studio";
const WAVE_NAME = "Wave Hello Studio";

function textToBlocks(text) {
  if (!text) return [];
  let linkSubstring = null;
  let href = null;
  if (text === WAVE_NAME) {
    linkSubstring = WAVE_NAME;
    href = WAVE_URL;
  } else if (text.includes(RAVAGE_NAME)) {
    linkSubstring = RAVAGE_NAME;
    href = RAVAGE_URL;
  }

  if (!linkSubstring) {
    return [
      {
        _type: "block",
        _key: genKey(),
        style: "normal",
        children: [{ _type: "span", _key: genKey(), text, marks: [] }],
        markDefs: [],
      },
    ];
  }

  const idx = text.indexOf(linkSubstring);
  const before = text.slice(0, idx);
  const after = text.slice(idx + linkSubstring.length);
  const linkKey = genKey();
  const children = [];
  if (before) children.push({ _type: "span", _key: genKey(), text: before, marks: [] });
  children.push({ _type: "span", _key: genKey(), text: linkSubstring, marks: [linkKey] });
  if (after) children.push({ _type: "span", _key: genKey(), text: after, marks: [] });

  return [
    {
      _type: "block",
      _key: genKey(),
      style: "normal",
      children,
      markDefs: [{ _key: linkKey, _type: "link", href }],
    },
  ];
}

// Every project (draft or published) that still has the old plain-string
// collaboration field (not yet migrated to richText / portable text arrays).
const docs = await client.fetch(`*[_type == "project" && defined(collaboration)]{_id, title, collaboration}`);

const toMigrate = docs.filter(
  (d) => d.collaboration && typeof d.collaboration.en === "string" && !Array.isArray(d.collaboration.en)
);

if (toMigrate.length === 0) {
  console.log("Nothing to migrate — all projects already use richText for 'collaboration'.");
  process.exit(0);
}

const tx = client.transaction();
for (const doc of toMigrate) {
  const collaboration = {
    en: textToBlocks(doc.collaboration.en),
    es: textToBlocks(doc.collaboration.es ?? doc.collaboration.en),
  };
  tx.patch(doc._id, (p) => p.set({ collaboration }).unset(["collaborationUrl"]));
  console.log("Migrating", doc._id, "(", doc.title, ") ->", doc.collaboration.en);
}
await tx.commit();
console.log("DONE —", toMigrate.length, "project(s) migrated.");
