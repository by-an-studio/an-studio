import { defineType, defineField } from 'sanity'
import { CaseIcon } from '@sanity/icons'
export const workPage = defineType({
  name: 'workPage',
  title: 'Work',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'noteLabel',
      title: 'Etiqueta (ej: "NOTE:")',
      type: 'localeString',
    }),
    defineField({
      name: 'noteText',
      title: 'Texto de la nota (texto enriquecido, ES/EN)',
      type: 'richText',
    }),
    defineField({
      name: 'categoriesLabel',
      title: 'Etiqueta del filtro (ej: "Categories")',
      type: 'localeString',
    }),
    defineField({
      name: 'categoryBrandIdentity',
      title: 'Categoría 01 — texto mostrado para "Brand Identity"',
      description: 'El valor interno "Brand Identity" no cambia (es el que coincide con el campo Categoría de cada proyecto). Este campo es solo el texto que se muestra.',
      type: 'localeString',
    }),
    defineField({
      name: 'categoryPackaging',
      title: 'Categoría 02 — texto mostrado para "Packaging"',
      type: 'localeString',
    }),
    defineField({
      name: 'categoryWebDesign',
      title: 'Categoría 03 — texto mostrado para "Web Design"',
      type: 'localeString',
    }),
    defineField({
      name: 'categorySocialMedia',
      title: 'Categoría 04 — texto mostrado para "Social Media"',
      type: 'localeString',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Work' }
    },
  },
})
