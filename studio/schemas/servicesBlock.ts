import {defineArrayMember, defineField, defineType} from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().error('Headline is required for the services section.'),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'card'})],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
})

export default services
