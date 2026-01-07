import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Header Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',

              validation: (Rule) => Rule.required().error('A label is required'),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({allowRelative: true}).error('A valid link is required'),
            },
          ],
        },
      ],
      description: 'Add, remove, or reorder header items.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `Menu Header`,
      }
    },
  },
})
