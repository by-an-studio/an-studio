import { defineType, defineField } from 'sanity'
export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Servicio',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Numeral (ej: 01)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Nombre del servicio',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Párrafos (texto enriquecido, ES/EN)',
      type: 'richText',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline estimado',
      type: 'localeString',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen destacada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredTitle',
      title: 'Título mostrado junto a la imagen destacada',
      type: 'localeString',
    }),
    defineField({
      name: 'featuredImageIndex',
      title: 'Numeral de la imagen (ej: 09)',
      description: 'El "Img. XX" que se muestra junto al proyecto destacado.',
      type: 'string',
    }),
    defineField({
      name: 'featuredTags',
      title: 'Tags mostrados junto al proyecto destacado',
      description: 'Ej: "Brand Identity", "Product Design" — no tienen que coincidir con los tags reales del proyecto.',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'number' },
  },
})
