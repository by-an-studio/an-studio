import { defineType, defineField } from 'sanity'
export const footerLinkItem = defineType({
  name: 'footerLinkItem',
  title: 'Elemento con enlace',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texto',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Enlace (ej: "/work/saie" o "https://...")',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'href' },
  },
})
