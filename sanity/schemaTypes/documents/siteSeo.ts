import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'
export const siteSeo = defineType({
  name: 'siteSeo',
  title: 'Ajustes SEO (Home / Work)',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({ name: 'home', title: 'Home', type: 'seo' }),
    defineField({ name: 'work', title: 'Work (listado)', type: 'seo' }),
  ],
  preview: {
    prepare() {
      return { title: 'Ajustes SEO' }
    },
  },
})
