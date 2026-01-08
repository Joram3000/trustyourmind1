import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'postsPage',
  title: 'Posts Page',
  type: 'document',
  icon: DocumentTextIcon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Posts Page',
      }
    },
  },
})
