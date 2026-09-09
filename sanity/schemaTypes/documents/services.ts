import { defineType, defineField } from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'headerLabel',
      title: 'Texto superior (ej: "Our Services:")',
      type: 'string',
      initialValue: 'Our Services:',
    }),
    defineField({
      name: 'headerTagline',
      title: 'Subtítulo (ej: "Let\'s Create Together")',
      type: 'string',
      initialValue: "Let's Create Together",
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
      type: 'string',
      initialValue: 'Other Services:',
    }),
    defineField({
      name: 'otherServices',
      title: 'Other Services (lista)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'industryTitle',
      title: 'Título "Industry"',
      type: 'string',
      initialValue: 'Industry',
    }),
    defineField({
      name: 'industry',
      title: 'Industry (lista)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contactTitle',
      title: 'Título "Contact"',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'contactLines',
      title: 'Contact (líneas)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services' }
    },
  },
})
