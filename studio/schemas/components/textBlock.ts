import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading displayed above the copy.',
      validation: (Rule) => [Rule.max(120).warning('Keep titles concise so they wrap nicely.')],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Rich text content for this section.',
      validation: (Rule) => [
        Rule.required().error('Add copy to this text block.'),
        Rule.max(1200).warning('Aim for fewer than 1,200 characters per block.'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
    },
    prepare({title, body}) {
      return {
        title: title || 'Text Block',
        subtitle: `${body?.length ?? 0} blocks`,
      }
    },
  },
})
