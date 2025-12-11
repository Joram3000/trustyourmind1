import {SparkleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: SparkleIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
      description: 'Pick the Lucide icon that best accompanies the USP card.',
      validation: (Rule) => [Rule.required().error('Select an icon to visualise the USP.')],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short, punchy heading for the card.',
      validation: (Rule) => [
        Rule.required().error('Provide a title that summarises the USP.'),
        Rule.min(4).warning('Use at least four characters for clarity.'),
        Rule.max(60).warning('Keep titles under 60 characters for readability.'),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      description: 'Supporting copy describing the USP in one or two sentences.',
      validation: (Rule) => [
        Rule.required().error('Add descriptive copy to explain the USP.'),
        Rule.min(20).warning('Consider adding a bit more detail for context.'),
        Rule.max(280).warning('Aim to keep the content under 280 characters.'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon.name',
      description: 'content',
      icon: 'icon',
    },
    prepare({title, description, icon}) {
      return {
        icon: icon,
        title: title ?? 'Untitled card',
        subtitle: description?.slice(0, 35),
      }
    },
  },
})

export default card
