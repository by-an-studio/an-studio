import { defineType, defineField } from 'sanity'

export const imageWithTags = defineType({
  name: 'imageWithTags',
  title: 'Imagen con tags',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags (líneas debajo del nombre del proyecto)',
      description: 'Ej: "Brand World", "Web Design"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { media: 'image', tags: 'tags' },
    prepare({ media, tags }) {
      return {
        title: tags && tags.length ? tags.join(', ') : 'Imagen',
        media,
      }
    },
  },
})
