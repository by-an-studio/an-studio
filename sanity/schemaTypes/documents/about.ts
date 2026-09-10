import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'
const richTextBlock = {
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
    ],
    annotations: [],
  },
}
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'owner', title: 'The Owner' },
    { name: 'intro', title: 'Intro' },
    { name: 'lists', title: 'Awards / Exhibitions / Clients' },
  ],
  fields: [
    defineField({
      name: 'ownerSectionLabel',
      title: 'Título sección (ej: "The Owner")',
      type: 'localeString',
      group: 'owner',
    }),
    defineField({
      name: 'ownerImage',
      title: 'Foto de An',
      type: 'image',
      options: { hotspot: true },
      group: 'owner',
    }),
    defineField({
      name: 'ownerNameLabel',
      title: 'Etiqueta (ej: "(An Zamora)")',
      type: 'localeString',
      group: 'owner',
    }),
    defineField({
      name: 'ownerBio',
      title: 'Biografía (texto enriquecido, ES/EN)',
      type: 'object',
      group: 'owner',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'array', of: [richTextBlock] }),
        defineField({ name: 'es', title: 'Español', type: 'array', of: [richTextBlock] }),
      ],
    }),
    defineField({
      name: 'ownerImageIndex',
      title: 'Numeral de imagen (ej: "IMG. 01")',
      type: 'string',
      group: 'owner',
    }),
    defineField({
      name: 'ownerName',
      title: 'Nombre corto (ej: "An")',
      type: 'string',
      group: 'owner',
    }),
    defineField({
      name: 'ownerRole',
      title: 'Cargo (ej: "Founder & Creative Director")',
      type: 'localeString',
      group: 'owner',
    }),
    defineField({
      name: 'introText',
      title: 'Texto intro (texto enriquecido, ES/EN)',
      type: 'object',
      group: 'intro',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'array', of: [richTextBlock] }),
        defineField({ name: 'es', title: 'Español', type: 'array', of: [richTextBlock] }),
      ],
    }),
    defineField({
      name: 'introSubtext',
      title: 'Subtexto lateral',
      type: 'localeText',
      group: 'intro',
    }),
    defineField({
      name: 'introImage',
      title: 'Imagen bajo la intro',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
    }),
    defineField({
      name: 'awardsTitle',
      title: 'Título "Awards"',
      type: 'localeString',
      group: 'lists',
    }),
    defineField({
      name: 'awards',
      title: 'Awards (lista)',
      type: 'array',
      of: [{ type: 'localeString' }],
      group: 'lists',
    }),
    defineField({
      name: 'exhibitionsTitle',
      title: 'Título "Exhibitions"',
      type: 'localeString',
      group: 'lists',
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions (lista)',
      type: 'array',
      of: [{ type: 'localeString' }],
      group: 'lists',
    }),
    defineField({
      name: 'clientsTitle',
      title: 'Título "Clients We\'ve Worked With"',
      type: 'localeString',
      group: 'lists',
    }),
    defineField({
      name: 'clientColumns',
      title: 'Columnas de clientes (3)',
      type: 'array',
      of: [{ type: 'clientColumn' }],
      group: 'lists',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About' }
    },
  },
})
