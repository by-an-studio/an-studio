import { defineType, defineField } from 'sanity'
import { TrolleyIcon } from '@sanity/icons'
export const shop = defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título (ej: "Shop")',
      type: 'localeString',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeText',
    }),
    defineField({
      name: 'products',
      title: 'Productos',
      type: 'array',
      of: [{ type: 'shopProduct' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Shop' }
    },
  },
})
