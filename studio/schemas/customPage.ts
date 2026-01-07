import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'customPage',
  title: 'Custom Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Assemble a page with hero and text blocks in any order.',
      of: [
        defineArrayMember({type: 'hero', title: 'Hero Block'}),
        defineArrayMember({type: 'textBlock', title: 'Text Block'}),
        defineArrayMember({type: 'imageGallery', title: 'Image Gallery'}),
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
        title: title || 'Custom Page',
      }
    },
  },
})
