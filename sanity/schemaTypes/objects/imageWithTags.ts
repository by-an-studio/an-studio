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
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL de vídeo (opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: { media: 'image' },
    prepare({ media }) {
      return { title: 'Imagen', media }
    },
  },
})
