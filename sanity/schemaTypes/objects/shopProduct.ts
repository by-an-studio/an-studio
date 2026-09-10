import { defineType, defineField } from 'sanity'
export const shopProduct = defineType({
  name: 'shopProduct',
  title: 'Producto',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryLabel',
      title: 'Categoría (ej: "Social Media")',
      description: 'Se muestra como "For [Categoría]"',
      type: 'localeString',
    }),
    defineField({
      name: 'name',
      title: 'Nombre del producto (ej: "The Dossier")',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo (ej: "Social Media Templates")',
      type: 'localeString',
    }),
    defineField({
      name: 'comingSoon',
      title: '¿Mostrar "Coming Soon!"?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'price',
      title: 'Precio (ej: "20€")',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Formato (ej: "Canva")',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gumroadUrl',
      title: 'Enlace de Gumroad (opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name.en', media: 'image' },
  },
})
