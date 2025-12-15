import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'
export default defineType({
  name: 'imageGallery',
  type: 'object',
  title: 'Gallery',
  icon: ImageIcon,
  fields: [
    {
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
})
