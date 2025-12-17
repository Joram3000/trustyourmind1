import {defineArrayMember, defineField, defineType} from 'sanity'

export const usp = defineType({
  name: 'usp',
  title: 'About the Practice',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About the practice',
      validation: (Rule) => [
        Rule.required().error('Provide a headline for the USP section before publishing.'),
        Rule.min(8).warning('Consider using a descriptive title to introduce the cards.'),
      ],
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'card'})],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Optional additional content to display below the cards.',
      validation: (Rule) => [
        Rule.max(500).warning('Keep additional content concise for better user engagement.'),
      ],
    }),
  ],
})

export default usp
