import { defineType, defineField } from 'sanity'
import { MenuIcon } from '@sanity/icons'
export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: MenuIcon,
  groups: [
    { name: 'newsletter', title: 'Newsletter' },
    { name: 'columns', title: 'Columnas' },
  ],
  fields: [
    defineField({
      name: 'subscribeLabel',
      title: 'Texto "Subscribe to our Newsletter"',
      type: 'localeString',
      group: 'newsletter',
    }),
    defineField({
      name: 'emailPlaceholder',
      title: 'Placeholder del email',
      type: 'localeString',
      group: 'newsletter',
    }),
    defineField({
      name: 'subscribeButtonLabel',
      title: 'Texto del botón',
      type: 'localeString',
      group: 'newsletter',
    }),
    defineField({
      name: 'comingSoonLabel',
      title: 'Texto tras suscribirse (ej: "Coming soon!")',
      type: 'localeString',
      group: 'newsletter',
    }),
    defineField({
      name: 'aboutSubItems',
      title: 'About — sublista',
      type: 'array',
      of: [{ type: 'footerLinkItem' }],
      group: 'columns',
    }),
    defineField({
      name: 'clientApplicationSubItems',
      title: 'Client Application — sublista',
      type: 'array',
      of: [{ type: 'footerLinkItem' }],
      group: 'columns',
    }),
    defineField({
      name: 'contactLabel',
      title: 'Título columna "Contact"',
      type: 'localeString',
      group: 'columns',
    }),
    defineField({
      name: 'contactItems',
      title: 'Contact — enlaces',
      type: 'array',
      of: [{ type: 'footerLinkItem' }],
      group: 'columns',
    }),
    defineField({
      name: 'socialLabel',
      title: 'Título columna "Social"',
      type: 'localeString',
      group: 'columns',
    }),
    defineField({
      name: 'socialItems',
      title: 'Social — enlaces',
      type: 'array',
      of: [{ type: 'footerLinkItem' }],
      group: 'columns',
    }),
    defineField({
      name: 'privacyPolicyLabel',
      title: 'Título "Privacy Policy"',
      type: 'localeString',
      group: 'columns',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' }
    },
  },
})
