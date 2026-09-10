import { defineType, defineField } from 'sanity'
import { ClipboardIcon } from '@sanity/icons'
export const clientApplication = defineType({
  name: 'clientApplication',
  title: 'Client Application',
  type: 'document',
  icon: ClipboardIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Contenido' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título (ej: "Work With Us")',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline (ej: "Let\'s build something lasting")',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroImages',
      title: 'Imágenes laterales (3)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'hero',
    }),
    defineField({
      name: 'headline',
      title: 'Frase destacada',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'featuredImages',
      title: 'Imágenes destacadas (2)',
      type: 'array',
      of: [{ type: 'captionedImage' }],
      group: 'content',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Título "List of Services"',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'servicesList',
      title: 'Lista de servicios',
      type: 'array',
      of: [{ type: 'localeString' }],
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Client Application' }
    },
  },
})
