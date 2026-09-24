import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const shopWaitlistSubscriber = defineType({
  name: 'shopWaitlistSubscriber',
  title: 'Shop Waitlist Subscriber',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'productName',
      title: 'Producto',
      type: 'string',
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Fecha de suscripción',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'productName' },
  },
})
