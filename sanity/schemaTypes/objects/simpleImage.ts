import { defineType, defineField } from 'sanity'

export const simpleImage = defineType({
  name: 'simpleImage',
  title: 'Imagen (variante simple)',
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
      name: 'mediaType',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Imagen', value: 'Img' },
          { title: 'Vídeo', value: 'Video' },
        ],
        layout: 'radio',
      },
      initialValue: 'Img',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags (líneas debajo del nombre del proyecto)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { media: 'image', mediaType: 'mediaType', tags: 'tags' },
    prepare({ media, mediaType, tags }) {
      return {
        title: `${mediaType || 'Img'} — ${tags && tags.length ? tags.join(', ') : ''}`,
        media,
      }
    },
  },
})
