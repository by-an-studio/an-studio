import { defineType, defineField } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'general', title: 'General' },
    { name: 'left', title: 'Columna izquierda' },
    { name: 'gallery', title: 'Contenido variante A (galería)' },
    { name: 'simple', title: 'Contenido variante B (simple)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título del proyecto',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectNumber',
      title: 'Número de proyecto',
      description: 'Se muestra como "(006.)" arriba del título. Escribe solo el número, ej: 006',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría (para el filtro de Work)',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Brand Identity', value: 'Brand Identity' },
          { title: 'Packaging', value: 'Packaging' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Social Media', value: 'Social Media' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal (grid de Work)',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden manual (opcional)',
      type: 'number',
      group: 'general',
    }),
    defineField({
      name: 'variant',
      title: 'Variante de plantilla',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Galería + texto extra (variante A)', value: 'gallery' },
          { title: 'Simple (variante B)', value: 'simple' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'simpleLayout',
      title: 'Sub-layout (solo variante Simple)',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: '1 imagen (single)', value: 'single' },
          { title: '2 imágenes (double)', value: 'double' },
          { title: 'Galería con flechas (gallery)', value: 'gallery' },
          { title: '1 imagen ancha, sin flechas (singleWide)', value: 'singleWide' },
        ],
      },
      hidden: ({ parent }) => parent?.variant !== 'simple',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.variant === 'simple' && !value) {
            return 'Elige un sub-layout para la variante Simple'
          }
          return true
        }),
    }),
    defineField({
      name: 'subtitleLine',
      title: 'Subtítulo (bajo el título)',
      type: 'localeString',
      group: 'left',
    }),
    defineField({
      name: 'collaboration',
      title: 'Colaboración (opcional)',
      description: 'Ej: "Wave Hello Studio". Se muestra como "In Collaboration with...". Déjalo vacío si no aplica.',
      type: 'localeString',
      group: 'left',
    }),
    defineField({
      name: 'aboutParagraph',
      title: 'About — párrafo principal',
      type: 'richText',
      group: 'left',
    }),
    defineField({
      name: 'projectTags',
      title: 'Categorías mostradas en la página (tags libres)',
      description: 'Distinto del campo "Categoría" de arriba — estos son los tags que se ven en el bloque "(Categories)" de la página del proyecto.',
      type: 'array',
      of: [{ type: 'localeString' }],
      group: 'left',
    }),
    defineField({
      name: 'bottomParagraph',
      title: 'Párrafo inferior (alineado abajo)',
      type: 'richText',
      group: 'left',
    }),
    defineField({
      name: 'rightIntroText',
      title: 'Texto introductorio (columna derecha)',
      type: 'richText',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'image1',
      title: 'Imagen 01',
      type: 'imageWithTags',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'image2',
      title: 'Imagen 02',
      type: 'imageWithTags',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Fila de galería (imágenes 03-06, con scroll)',
      type: 'array',
      of: [{ type: 'imageWithTags' }],
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'visualIdentityText',
      title: 'Texto "identidad visual"',
      type: 'richText',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'timelineDuration',
      title: 'Timeline — duración',
      type: 'localeString',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'timelineService',
      title: 'Timeline — servicio',
      type: 'localeString',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'timelineText',
      title: 'Texto junto al timeline',
      type: 'richText',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'mutedCaption',
      title: 'Caption gris (texto pequeño)',
      type: 'richText',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'image7',
      title: 'Imagen 07',
      type: 'imageWithTags',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'image8',
      title: 'Imagen 08',
      type: 'imageWithTags',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'finalText',
      title: 'Texto final',
      type: 'richText',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'image9',
      title: 'Imagen 09 (grande, final)',
      type: 'imageWithTags',
      group: 'gallery',
      hidden: ({ parent }) => parent?.variant !== 'gallery',
    }),
    defineField({
      name: 'simpleCaptionText',
      title: 'Texto encima de las imágenes',
      description: 'Si se deja vacío, no se renderiza en la página.',
      type: 'richText',
      group: 'simple',
      hidden: ({ parent }) => parent?.variant !== 'simple',
    }),
    defineField({
      name: 'simpleImages',
      title: 'Imágenes',
      description: '1 imagen para single/singleWide, 2 para double, varias para gallery (carrusel).',
      type: 'array',
      of: [{ type: 'simpleImage' }],
      group: 'simple',
      hidden: ({ parent }) => parent?.variant !== 'simple',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', category: 'category' },
    prepare({ title, media, category }) {
      return { title, subtitle: category, media }
    },
  },
})
