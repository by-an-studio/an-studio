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

function rt(en, es) {
  const toBlocks = (text) =>
    text.split("\n\n").map((para) => ({
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: para, marks: [] }],
      markDefs: [],
    }));
  return { en: toBlocks(en), es: toBlocks(es) };
}

const bySlug = {
  sorauni: {
    bottomParagraph: rt(
      "The identity was designed to feel quiet, elegant and highly visual. A custom logotype, restrained typography and minimal compositions create a system that allows the photography to remain at the center while giving Sorauni a recognizable presence.",
      "La identidad se diseñó para transmitir calma, elegancia y un fuerte componente visual. Un logotipo a medida, una tipografía contenida y composiciones minimalistas crean un sistema que permite que la fotografía permanezca en el centro, dando a Sorauni una presencia reconocible."
    ),
    visualIdentityText: rt(
      "The project began by exploring how the photographer's own name could become part of the visual identity. This personal connection informed the development of the logotype and helped establish a more distinctive and meaningful brand language.",
      "El proyecto comenzó explorando cómo el propio nombre de la fotógrafa podía formar parte de la identidad visual. Esta conexión personal guio el desarrollo del logotipo y ayudó a establecer un lenguaje de marca más distintivo y significativo."
    ),
    timelineText: rt(
      "From there, typography, layout and image direction were kept restrained, creating an elegant, contemporary system adaptable across different photographic contexts.",
      "A partir de ahí, la tipografía, la maquetación y la dirección de imagen se mantuvieron contenidas, creando un sistema elegante y contemporáneo, adaptable a diferentes contextos fotográficos."
    ),
    mutedCaption: rt(
      "A Refined Photography Identity Shaped Through Typography, Composition And Image Direction.",
      "Una identidad fotográfica refinada, construida a través de la tipografía, la composición y la dirección de imagen."
    ),
    finalText: rt(
      "A minimal photography identity where personal expression, refined typography and image-led design come together with clarity and restraint.",
      "Una identidad fotográfica minimalista donde la expresión personal, la tipografía refinada y un diseño guiado por la imagen se combinan con claridad y contención."
    ),
  },
  "zimo-creative": {
    bottomParagraph: rt(
      "The identity balances minimalism with a more expressive typographic approach. A custom monogram, monochrome palette and editorial layouts create a visual system that feels polished, recognizable and flexible across both digital and physical applications.",
      "La identidad equilibra el minimalismo con un enfoque tipográfico más expresivo. Un monograma a medida, una paleta monocromática y maquetaciones editoriales crean un sistema visual pulido, reconocible y flexible en aplicaciones tanto digitales como físicas."
    ),
    visualIdentityText: rt(
      "The project began by defining a visual language that could reflect Zimo Creative's position between social media, fashion and contemporary culture. Rather than relying on conventional agency aesthetics, the direction focused on restraint, typography and image-led composition.",
      "El proyecto comenzó definiendo un lenguaje visual que reflejara la posición de Zimo Creative entre las redes sociales, la moda y la cultura contemporánea. En lugar de apoyarse en la estética convencional de una agencia, la dirección se centró en la contención, la tipografía y una composición guiada por la imagen."
    ),
    timelineText: rt(
      "Across the logotype, monogram and applications, each element was developed to feel cohesive and adaptable, creating an identity with clarity, confidence and a strong point of view.",
      "En el logotipo, el monograma y las aplicaciones, cada elemento se desarrolló para sentirse cohesionado y adaptable, creando una identidad con claridad, seguridad y un punto de vista fuerte."
    ),
    mutedCaption: rt(
      "A Complete Identity Shaped Through Typography, Monogram, Editorial Design And Visual Direction.",
      "Una identidad completa, construida a través de la tipografía, el monograma, el diseño editorial y la dirección visual."
    ),
    finalText: rt(
      "A monochrome identity where editorial composition, refined typography and fashion-led art direction come together with clarity and confidence.",
      "Una identidad monocromática donde la composición editorial, la tipografía refinada y una dirección de arte orientada a la moda se combinan con claridad y seguridad."
    ),
  },
};

for (const [slug, fields] of Object.entries(bySlug)) {
  const doc = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{_id}`,
    { slug }
  );
  if (!doc) {
    console.error("Not found at all for slug:", slug);
    continue;
  }
  try {
    await client.patch(doc._id).set(fields).commit();
    console.log("Patched:", doc._id, "(slug:", slug + ")");
  } catch (err) {
    console.error("Failed:", doc._id, err.message);
  }
}
console.log("DONE");
