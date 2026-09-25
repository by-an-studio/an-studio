import { defineType, defineField } from 'sanity'
export const shopProduct = defineType({
  name: 'shopProduct',
  title: 'Producto',
  type: 'object',
  fields: [
    defineField({
      name: 'categoryLabel',
      title: 'Categoría (ej: "Social Media")',
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
      title: '¿Producto en "Coming Soon"?',
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
      title: 'Enlace de Gumroad',
      type: 'url',
    }),
    defineField({
      name: 'buyButtonLabel',
      title: 'Texto del botón de compra (ej: "Buy now"). Si se deja vacío, se usa "Buy now".',
      type: 'localeString',
    }),
    defineField({
      name: 'waitlistButtonLabel',
      title: 'Texto del botón de lista de espera (ej: "Join the waitlist"). Solo se usa si "Coming Soon" está activo y no hay enlace de Gumroad. Si se deja vacío, se usa "Join the waitlist".',
      type: 'localeString',
    }),
  ],
  preview: {
    select: { title: 'name.en', media: 'image' },
  },
})
