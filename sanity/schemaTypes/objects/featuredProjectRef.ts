import { defineType, defineField } from 'sanity'

export const featuredProjectRef = defineType({
  name: 'featuredProjectRef',
  title: 'Proyecto destacado',
  type: 'object',
  fields: [
    defineField({
      name: 'project',
      title: 'Proyecto',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'imageIndex',
      title: 'Numeral (ej: "01")',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags mostrados',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'project.title' },
  },
})
