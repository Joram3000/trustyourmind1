import {DesktopIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const colorList = [
  '#101112',
  '#efece7',
  '#2d251f',
  '#231e1a',
  '#8a2830',
  '#79242b',
  'rgba(163, 156, 143, 1)',
]

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  icon: DesktopIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',

      validation: (Rule) => Rule.required().error('Headline is required for the hero section.'),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'textColors',
      title: 'Text Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'headlineColor',
          title: 'Headline Color',
          type: 'color',
          options: {colorList},
        }),
        defineField({
          name: 'subheadlineColor',
          title: 'Subheadline Color',
          type: 'color',
          options: {colorList},
        }),
        defineField({
          name: 'excerptColor',
          title: 'Excerpt Color',
          type: 'color',
          options: {colorList},
        }),
      ],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'button',
    }),

    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
    },
  },
})

export default hero
