import { defineType, defineField } from 'sanity'
export const captionedImage = defineType({
  name: 'captionedImage',
  title: 'Imagen con caption',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageIndex',
      title: 'Numeral (ej: "01")',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Nombre (ej: "An Studio")',
      type: 'localeString',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'caption.en', media: 'image' },
  },
})
