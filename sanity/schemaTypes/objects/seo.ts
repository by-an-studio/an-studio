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
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (Open Graph)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
