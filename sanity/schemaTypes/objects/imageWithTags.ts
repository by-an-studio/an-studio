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
      description: 'Si se rellena, se mostrará este vídeo en bucle en vez de la imagen (ej: enlace de Cloudflare R2).',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { tags: 'tags', media: 'image' },
    prepare({ tags, media }) {
      return { title: tags?.join(', ') || 'Sin tags', media }
    },
  },
})
