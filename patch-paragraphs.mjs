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

// Corrected mapping: what was previously stored as visualIdentityText actually
// belongs in bottomParagraph, and what was stored as timelineText is really two
// paragraphs: the first is visualIdentityText, the second is the real timelineText.
const patches = {
  "drafts.project-003-sorauni": {
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
  "drafts.project-004-zimo-creative": {
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
  "drafts.project-006-sb-joaillerie": {
    bottomParagraph: rt(
      "The identity balances historical references with a contemporary point of view, using a custom logotype, monogram, refined typography, restrained color and editorial art direction to create a cohesive and distinctive visual world with intention.",
      "La identidad equilibra las referencias históricas con un punto de vista contemporáneo, utilizando un logotipo y monograma a medida, una tipografía refinada, un color contenido y una dirección de arte editorial para crear un mundo visual cohesionado, distintivo e intencionado."
    ),
    visualIdentityText: rt(
      "The visual identity was designed to feel both inherited and contemporary. Engraved details, traditional monograms, handwritten forms and antique jewelry shaped the creative direction, reinterpreted through a more restrained graphic approach.",
      "La identidad visual se diseñó para transmitir a la vez herencia y contemporaneidad. Los detalles grabados, los monogramas tradicionales, las formas manuscritas y las joyas antiguas dieron forma a la dirección creativa, reinterpretada desde un enfoque gráfico más contenido."
    ),
    timelineText: rt(
      "Across the logotype, monogram, typography, color palette and imagery, each element was developed to feel connected, creating a cohesive world with character, elegance and lasting relevance.",
      "En el logotipo, el monograma, la tipografía, la paleta de color y la imagen, cada elemento se desarrolló para sentirse conectado, creando un mundo cohesionado con carácter, elegancia y vigencia duradera."
    ),
    mutedCaption: rt(
      "A Complete Visual Identity Shaped Through Typography, Monogram, Color And Image Direction.",
      "Una identidad visual completa, construida a través de la tipografía, el monograma, el color y la dirección de imagen."
    ),
    finalText: rt(
      "A visual identity where historical references, refined typography and contemporary art direction come together to create an elegant and timeless world.",
      "Una identidad visual donde las referencias históricas, la tipografía refinada y una dirección de arte contemporánea se combinan para crear un mundo elegante y atemporal."
    ),
  },
  "drafts.project-008-marea-de-sicilia": {
    bottomParagraph: rt(
      "The identity balances raw natural references with a more refined graphic system. Organic forms, restrained typography and image-led compositions create a visual world that feels sensual, quiet and rooted in the atmosphere of the Mediterranean.",
      "La identidad equilibra referencias naturales en bruto con un sistema gráfico más refinado. Las formas orgánicas, la tipografía contenida y las composiciones guiadas por la imagen crean un mundo visual sensual, sereno y arraigado en la atmósfera del Mediterráneo."
    ),
    visualIdentityText: rt(
      "The project began by listening to the visual language of Sicily itself: salt, stone, silence and the movement of water. These references guided the creative direction, establishing a world built around contrast, between fluid and structured, sensual and raw.",
      "El proyecto comenzó escuchando el propio lenguaje visual de Sicilia: sal, piedra, silencio y el movimiento del agua. Estas referencias guiaron la dirección creativa, estableciendo un mundo construido sobre el contraste, entre lo fluido y lo estructurado, lo sensual y lo en bruto."
    ),
    timelineText: rt(
      "From there, the logotype and wider identity were developed to feel like traces shaped over time, creating a brand language that feels instinctive, sculptural and closely connected to the sea.",
      "A partir de ahí, el logotipo y la identidad completa se desarrollaron para sentirse como huellas moldeadas por el tiempo, creando un lenguaje de marca instintivo, escultórico y estrechamente conectado con el mar."
    ),
    mutedCaption: rt(
      "A Sculptural Identity Shaped By Sea, Stone, Movement And The Quiet Marks Left By Time.",
      "Una identidad escultórica, construida por el mar, la piedra, el movimiento y las huellas silenciosas que deja el tiempo."
    ),
    finalText: rt(
      "A jewelry identity shaped through typography, image, natural references and a sculptural visual language.",
      "Una identidad de joyería construida a través de la tipografía, la imagen, las referencias naturales y un lenguaje visual escultórico."
    ),
  },
  "drafts.project-009-sunbase": {
    bottomParagraph: rt(
      "The identity balances a clean graphic system with warmer, more tactile elements. Rounded typography, embossed details, soft color and the capsule-shaped packaging work together to create a brand that feels playful, contemporary and easy to recognize.",
      "La identidad equilibra un sistema gráfico limpio con elementos más cálidos y táctiles. La tipografía redondeada, los detalles en relieve, el color suave y el packaging en forma de cápsula trabajan juntos para crear una marca desenfadada, contemporánea y fácil de reconocer."
    ),
    visualIdentityText: rt(
      "The project began by rethinking how sunscreen could look and feel within the beauty category. Instead of relying on clinical codes, the creative direction focused on softness, tactility and simple forms that could make the product feel more familiar and enjoyable to use.",
      "El proyecto comenzó replanteando cómo podía verse y sentirse un protector solar dentro de la categoría de belleza. En lugar de apoyarse en códigos clínicos, la dirección creativa se centró en la suavidad, la tactilidad y formas sencillas que hicieran el producto más familiar y agradable de usar."
    ),
    timelineText: rt(
      "Across the identity, packaging and product design, each detail was developed as part of one cohesive system, creating a visual world that feels bright, approachable and distinctly Sunbase.",
      "En la identidad, el packaging y el diseño de producto, cada detalle se desarrolló como parte de un mismo sistema cohesionado, creando un mundo visual luminoso, cercano y distintivamente Sunbase."
    ),
    mutedCaption: rt(
      "A Complete Sun Care Identity Shaped Across Branding, Packaging, Product Form And Visual Direction.",
      "Una identidad de cuidado solar completa, construida a través de la marca, el packaging, la forma del producto y la dirección visual."
    ),
    finalText: rt(
      "A playful sun care system shaped through soft forms, tactile details, warm color and a contemporary beauty-led visual language",
      "Un sistema de cuidado solar desenfadado, construido a través de formas suaves, detalles táctiles, color cálido y un lenguaje visual contemporáneo orientado a la belleza"
    ),
  },
  "drafts.project-010-la-merceria-de-yoya": {
    bottomParagraph: rt(
      "The identity was designed to preserve the warmth and history of the store while introducing a more modern system. Cross-stitch lettering, soft color and familiar sewing references create a visual language that feels rooted in tradition yet flexible enough to evolve.",
      "La identidad se diseñó para preservar la calidez y la historia de la tienda, introduciendo a la vez un sistema más moderno. La tipografía en punto de cruz, el color suave y las referencias a la costura crean un lenguaje visual arraigado en la tradición, pero lo bastante flexible como para evolucionar."
    ),
    visualIdentityText: rt(
      "The project began by translating the world of sewing into the brand itself. The logo was reworked through a cross-stitch inspired system, while buttons, thread, scissors and needles became recurring graphic elements across the packaging and wider identity.",
      "El proyecto comenzó traduciendo el mundo de la costura a la propia marca. El logo se reelaboró a través de un sistema inspirado en el punto de cruz, mientras que los botones, el hilo, las tijeras y las agujas se convirtieron en elementos gráficos recurrentes en el packaging y en toda la identidad."
    ),
    timelineText: rt(
      "From there, the packaging system introduced more dynamic formats and new ways of presenting button catalogs and collections, making the brand feel more playful, useful and adaptable.",
      "A partir de ahí, el sistema de packaging incorporó formatos más dinámicos y nuevas formas de presentar catálogos de botones y colecciones, haciendo que la marca se sintiera más desenfadada, útil y adaptable."
    ),
    mutedCaption: rt(
      "A Heritage Identity Refreshed Through Cross-Stitch Graphics And Familiar Haberdashery Details.",
      "Una identidad con historia, renovada a través de gráficos en punto de cruz y detalles familiares de mercería."
    ),
    finalText: rt(
      "A contemporary haberdashery identity built from cross-stitch graphics, sewing objects and a playful reinterpretation of traditional craft.",
      "Una identidad de mercería contemporánea construida a partir de gráficos en punto de cruz, objetos de costura y una reinterpretación desenfadada de la artesanía tradicional."
    ),
  },
  "drafts.project-013-rocco-s": {
    bottomParagraph: rt(
      "The identity combines traditional Italian references with a more graphic and contemporary approach. Strong typography, deep warm tones and tactile packaging create a visual system that feels familiar yet distinctive, giving Rocco's an expressive and recognizable personality.",
      "La identidad combina referencias tradicionales italianas con un enfoque más gráfico y contemporáneo. Una tipografía fuerte, tonos cálidos y profundos, y un packaging táctil crean un sistema visual familiar pero distintivo, que otorga a Rocco's una personalidad expresiva y reconocible."
    ),
    visualIdentityText: rt(
      "The project began by exploring the visual language of traditional Italian cafés, gelaterias and food packaging. Rather than reproducing these references literally, the creative direction focused on their warmth and familiarity, translating them into a contemporary brand system.",
      "El proyecto comenzó explorando el lenguaje visual de los cafés italianos tradicionales, las heladerías y el packaging alimentario. En lugar de reproducir estas referencias de forma literal, la dirección creativa se centró en su calidez y familiaridad, trasladándolas a un sistema de marca contemporáneo."
    ),
    timelineText: rt(
      "Across identity, packaging and physical applications, each element was developed to feel connected, creating a cohesive world that balances nostalgia with a bold modern presence.",
      "En la identidad, el packaging y las aplicaciones físicas, cada elemento se desarrolló para sentirse conectado, creando un mundo cohesionado que equilibra la nostalgia con una presencia moderna y audaz."
    ),
    mutedCaption: rt(
      "A Complete Identity Shaped Across Typography, Packaging, Color And Visual Direction.",
      "Una identidad completa, construida a través de la tipografía, el packaging, el color y la dirección visual."
    ),
    finalText: rt(
      "A warm and characterful identity where Italian nostalgia, bold typography and contemporary design come together in one cohesive visual world.",
      "Una identidad cálida y con carácter donde la nostalgia italiana, la tipografía audaz y el diseño contemporáneo se combinan en un mundo visual cohesionado."
    ),
  },
  "drafts.project-014-coprinello": {
    bottomParagraph: rt(
      "The identity balances natural references with a more polished visual language. Earthy tones, soft materials, organic forms and restrained typography create a world that feels immersive, tactile and distinctly connected to the scent.",
      "La identidad equilibra las referencias naturales con un lenguaje visual más pulido. Los tonos terrosos, los materiales suaves, las formas orgánicas y la tipografía contenida crean un mundo inmersivo, táctil y estrechamente conectado con el aroma."
    ),
    visualIdentityText: rt(
      "The project began by exploring how the atmosphere of the forest could be translated into a fragrance brand without relying on familiar botanical codes. Mushrooms, moss, soil and stone became visual references, guiding the development of the bottle, packaging and wider identity.",
      "El proyecto comenzó explorando cómo podía trasladarse la atmósfera del bosque a una marca de fragancias sin recurrir a los códigos botánicos habituales. Las setas, el musgo, la tierra y la piedra se convirtieron en referencias visuales que guiaron el desarrollo del frasco, el packaging y el resto de la identidad."
    ),
    timelineText: rt(
      "From there, each element was refined into a cohesive system where nature, material and scent come together through a quieter and more contemporary point of view.",
      "A partir de ahí, cada elemento se refinó en un sistema cohesionado donde la naturaleza, el material y el aroma se combinan desde un punto de vista más sereno y contemporáneo."
    ),
    mutedCaption: rt(
      "A Fragrance Identity Shaped By Nature, Product Form, Packaging And Visual Direction.",
      "Una identidad de fragancias construida por la naturaleza, la forma del producto, el packaging y la dirección visual."
    ),
    finalText: rt(
      "A sensory fragrance world shaped by forest references, organic forms and a quiet, tactile visual language.",
      "Un mundo sensorial de fragancias construido a partir de referencias del bosque, formas orgánicas y un lenguaje visual sereno y táctil."
    ),
  },
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
