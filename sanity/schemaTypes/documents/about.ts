import { defineType, defineField } from 'sanity'

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
  groups: [
    { name: 'owner', title: 'The Owner' },
    { name: 'intro', title: 'Intro' },
    { name: 'lists', title: 'Awards / Exhibitions / Clients' },
  ],
  fields: [
    defineField({
      name: 'ownerSectionLabel',
      title: 'Título sección (ej: "The Owner")',
      type: 'string',
      initialValue: 'The Owner',
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
      type: 'string',
      group: 'owner',
    }),
    defineField({
      name: 'ownerBio',
      title: 'Biografía (texto enriquecido)',
      type: 'array',
      of: [richTextBlock],
      group: 'owner',
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
      type: 'string',
      group: 'owner',
    }),
    defineField({
      name: 'introText',
      title: 'Texto intro (texto enriquecido)',
      type: 'array',
      of: [richTextBlock],
      group: 'intro',
    }),
    defineField({
      name: 'introSubtext',
      title: 'Subtexto lateral',
      type: 'text',
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
      type: 'string',
      initialValue: 'Awards',
      group: 'lists',
    }),
    defineField({
      name: 'awards',
      title: 'Awards (lista)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'lists',
    }),
    defineField({
      name: 'exhibitionsTitle',
      title: 'Título "Exhibitions"',
      type: 'string',
      initialValue: 'Exhibitions',
      group: 'lists',
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions (lista)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'lists',
    }),
    defineField({
      name: 'clientsTitle',
      title: 'Título "Clients We\'ve Worked With"',
      type: 'string',
      initialValue: "Clients We've Worked With",
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
