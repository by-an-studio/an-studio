import { defineType, defineField } from 'sanity'
import { LockIcon } from '@sanity/icons'
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
      type: 'richText',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Privacy Policy' }
    },
  },
})
