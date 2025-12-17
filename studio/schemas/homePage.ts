import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    defineField({
      name: 'usp',
      title: 'USP Section',
      type: 'usp',
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'services',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'contact',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
