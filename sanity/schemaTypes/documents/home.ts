import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'
export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Imágenes del hero (rotación)',
      description: 'Las imágenes que rotan en el bloque principal de la Home. Sube hasta 8, en el orden en que deben aparecer.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'studioLabel',
      title: 'Etiqueta superior (ej: "Independent Design Studio")',
      type: 'localeString',
    }),
    defineField({
      name: 'heroGroup1',
      title: 'Bloque de texto hero 1',
      type: 'object',
      fields: [
        defineField({ name: 'line1', title: 'Línea 1', type: 'localeString' }),
        defineField({ name: 'line2', title: 'Línea 2', type: 'localeString' }),
        defineField({ name: 'line3', title: 'Línea 3 (cursiva)', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'heroGroup2',
      title: 'Bloque de texto hero 2',
      type: 'object',
      fields: [
        defineField({ name: 'line1', title: 'Línea 1', type: 'localeString' }),
        defineField({ name: 'line2', title: 'Línea 2', type: 'localeString' }),
        defineField({ name: 'line3', title: 'Línea 3 (cursiva)', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'availableLabel',
      title: 'Etiqueta "Available Worldwide"',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'newsletterButtonLabel',
      title: 'Texto del botón de newsletter',
      type: 'localeString',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Placeholder del campo de email (newsletter)',
      type: 'localeString',
    }),
    defineField({
      name: 'comingSoonLabel',
      title: 'Texto tras suscribirse (ej: "Coming soon!")',
      type: 'localeString',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home' }
    },
  },
})
