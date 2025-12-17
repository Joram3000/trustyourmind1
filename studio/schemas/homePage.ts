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
      type: 'uspBlock',
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'servicesBlock',
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'contactBlock',
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
