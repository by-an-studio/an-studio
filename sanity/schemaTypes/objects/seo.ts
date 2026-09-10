import { defineType, defineField } from 'sanity'
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta título',
      type: 'localeString',
      description: 'Si se deja vacío, se usa el título por defecto de la página.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción',
      type: 'localeText',
      description: 'Si se deja vacío, se usa la descripción por defecto de la página.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Recomendado 1200x630px. Se usa al compartir el link en redes sociales, WhatsApp, etc.',
    }),
  ],
})
