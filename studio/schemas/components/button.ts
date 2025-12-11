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
        Rule.required().error('Provide a label for the button.'),
        Rule.min(2).warning('Use at least two characters for clarity.'),
        Rule.max(30).warning('Keep labels under 30 characters for readability.'),
      ],
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
