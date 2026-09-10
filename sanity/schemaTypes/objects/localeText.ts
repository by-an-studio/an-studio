import { defineType, defineField } from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text' }),
    defineField({ name: 'es', title: 'Español', type: 'text' }),
  ],
  preview: {
    select: { title: 'en' },
  },
})
