import { defineType, defineField } from 'sanity'

export const clientApplication = defineType({
  name: 'clientApplication',
  title: 'Client Application',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Contenido' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título (ej: "Work With Us")',
      type: 'string',
      initialValue: 'Work With Us',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline (ej: "Let\'s build something lasting")',
      type: 'string',
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
      type: 'text',
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
      type: 'string',
      initialValue: 'List of Services',
      group: 'content',
    }),
    defineField({
      name: 'servicesList',
      title: 'Lista de servicios',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Client Application' }
    },
  },
})
