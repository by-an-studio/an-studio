import { defineType, defineField } from 'sanity'
export const clientColumn = defineType({
  name: 'clientColumn',
  title: 'Columna de clientes',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de columna (ej: Beauty)',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clients',
      title: 'Clientes',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
  ],
  preview: {
    select: { title: 'title.en' },
  },
})
