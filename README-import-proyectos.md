# Importar los 8 proyectos a Sanity

No he podido escribir directamente en Sanity porque `api.sanity.io` está bloqueado por la política de red tanto del entorno cloud como del túnel a tu Mac. En vez de eso, aquí tienes el archivo `projects.ndjson` con los 8 proyectos listos (Sorauni, Zimo Creative, SB Joaillerie, Marea de Sicilia, Sunbase, La Mercería de Yoya, Rocco's, Coprinello), como **borradores** (`drafts.*`) con todos los campos de texto en EN/ES, sin imágenes.

## Cómo importarlos

Desde una terminal normal en tu Mac (fuera de este entorno), en la carpeta del proyecto:

```bash
cd "/ruta/a/An Studio/an-studio"
npx sanity dataset import projects.ndjson production --replace
```

Esto sube los 8 documentos como borradores. Luego solo tienes que entrar en el Studio, añadir la `mainImage` (y el resto de imágenes: image1, image2, galleryImages, image7, image8, image9) y publicarlos cuando estén listos.

`--replace` solo sobrescribe estos 8 IDs (`drafts.project-XXX-slug`) si ya existieran; no toca el resto del dataset.
