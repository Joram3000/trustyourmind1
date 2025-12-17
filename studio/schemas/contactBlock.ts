import {defineType} from 'sanity'

export const contactBlock = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'officeHours',
      title: 'Office Hours',
      type: 'blockContent',
    },
  ],
})

export default contactBlock
