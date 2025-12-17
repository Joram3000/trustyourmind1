import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactInformation',
  title: 'Contact Information',
  type: 'document',
  options: {
    singleton: true,
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Please enter a valid email address.'),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(10).max(15).error('Please enter a valid phone number.'),
    }),
    defineField({
      name: 'address',
      title: 'Address (optional)',
      type: 'string',
      validation: (Rule) => Rule.min(5).max(200),
    }),
    defineField({
      name: 'kvk',
      title: 'KVK (optional)',
      type: 'string',
      validation: (Rule) => Rule.min(8).max(20),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
      }
    },
  },
})
