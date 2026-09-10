import { defineType, defineField } from 'sanity'
import { WrenchIcon } from '@sanity/icons'
export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'headerLabel',
      title: 'Texto superior (ej: "Our Services:")',
      type: 'localeString',
    }),
    defineField({
      name: 'headerTagline',
      title: 'Subtítulo (ej: "Let\'s Create Together")',
      type: 'localeString',
    }),
    defineField({
      name: 'servicesList',
      title: 'Lista de servicios',
      type: 'array',
      of: [{ type: 'serviceItem' }],
    }),
    defineField({
      name: 'otherServicesTitle',
      title: 'Título "Other Services"',
      type: 'localeString',
    }),
    defineField({
      name: 'otherServices',
      title: 'Other Services (lista)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'industryTitle',
      title: 'Título "Industry"',
      type: 'localeString',
    }),
    defineField({
      name: 'industry',
      title: 'Industry (lista)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'contactTitle',
      title: 'Título "Contact"',
      type: 'localeString',
    }),
    defineField({
      name: 'contactLines',
      title: 'Contact (líneas)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services' }
    },
  },
})
