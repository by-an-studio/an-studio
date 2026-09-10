import { defineType, defineField } from 'sanity'
import { LockIcon } from '@sanity/icons'
const richTextBlock = {
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
      { title: 'Underline', value: 'underline' },
    ],
    annotations: [],
  },
}
export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Título de la página (ej: "Privacy Policy")',
      type: 'localeString',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Texto "Last updated" (ej: "Last updated: August, 2026")',
      type: 'localeString',
    }),
    defineField({
      name: 'content',
      title: 'Contenido (texto enriquecido, ES/EN)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'array', of: [richTextBlock] }),
        defineField({ name: 'es', title: 'Español', type: 'array', of: [richTextBlock] }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Privacy Policy' }
    },
  },
})
