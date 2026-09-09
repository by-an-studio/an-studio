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
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Nombre del producto (ej: "The Dossier")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo (ej: "Social Media Templates")',
      type: 'string',
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
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
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
    select: { title: 'name', media: 'image' },
  },
})
