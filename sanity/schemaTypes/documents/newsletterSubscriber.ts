import { defineType, defineField } from 'sanity'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Fecha de suscripción',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'subscribedAt' },
  },
})
