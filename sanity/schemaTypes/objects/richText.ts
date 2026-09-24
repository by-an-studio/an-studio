import { defineType, defineField } from 'sanity'
const richTextBlock = {
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
      { title: 'Underline', value: 'underline' },
    ],
    annotations: [
      {
        name: 'link',
        title: 'Enlace',
        type: 'object',
        fields: [
          {
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (Rule: any) => Rule.required(),
          },
        ],
      },
    ],
  },
}
export const richText = defineType({
  name: 'richText',
  title: 'Texto enriquecido (ES/EN)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'array', of: [richTextBlock] }),
    defineField({ name: 'es', title: 'Español', type: 'array', of: [richTextBlock] }),
  ],
})
