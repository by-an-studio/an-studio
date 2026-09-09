import { defineType, defineField } from 'sanity'

export const shop = defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (ej: "Shop")',
      type: 'string',
      initialValue: 'Shop',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
    }),
    defineField({
      name: 'products',
      title: 'Productos',
      type: 'array',
      of: [{ type: 'shopProduct' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Shop' }
    },
  },
})
