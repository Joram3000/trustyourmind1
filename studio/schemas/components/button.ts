import {SparkleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Text displayed on the button.',
      validation: (Rule) => [
        Rule.min(2).warning('Use at least two characters for clarity.'),
        Rule.max(30).warning('Keep labels under 30 characters for readability.'),
      ],
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The link the button will navigate to when clicked.',
      validation: (Rule) => [
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }).error('Please enter a valid URL starting with http, https, mailto, or tel.'),
      ],
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'If enabled, the link will open in a new browser tab.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
    prepare({title, subtitle}) {
      return {
        title: title ?? 'Untitled button',
        subtitle: subtitle,
      }
    },
  },
})

export default button
