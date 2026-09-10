import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto (ES/EN)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'es', title: 'Español', type: 'string' }),
  ],
  preview: {
    select: { title: 'en' },
  },
})
