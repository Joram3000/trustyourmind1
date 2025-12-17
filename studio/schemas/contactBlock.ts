import {DocumentTextIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  icon: DocumentTextIcon,
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
