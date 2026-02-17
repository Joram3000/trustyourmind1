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

  // Gebruik fieldsets om velden visueel te groeperen in de editor.
  fieldsets: [
    {name: 'content', title: 'Content'},
    {name: 'media', title: 'Media'},
    {name: 'styles', title: 'Styles'},
    {name: 'cta', title: 'Call to action'},
  ],

  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      fieldset: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) =>
            Rule.custom((alt, context) =>
              !context?.parent || !context.parent.asset
                ? true
                : alt && alt.length > 0
                  ? true
                  : 'Alternative text is required when a background image is present',
            ),
        },
      ],
    }),
    // logo is optioneel: geen Rule.required() op het parent-veld
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          // alleen verplicht wanneer er daadwerkelijk een afbeelding is geüpload
          validation: (Rule) =>
            Rule.custom((alt, context) =>
              !context?.parent || !context.parent.asset
                ? true
                : alt && alt.length > 0
                  ? true
                  : 'Alternative text is required when a logo is present',
            ),
        },
        {
          name: 'sizeWidth',
          title: 'Size Width (px)',
          type: 'number',
          description: 'width of the logo in pixels',
        },
      ],
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      fieldset: 'content',
      // optioneel: verwijder Rule.required() om optioneel te maken.
      validation: (Rule) => [Rule.max(140).warning('Houd de headline kort (max 140 tekens).')],
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      fieldset: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      fieldset: 'content',
    }),

    defineField({
      name: 'textColors',
      title: 'Text Colors',
      type: 'object',
      fieldset: 'styles',
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

    // CTA optioneel (geen required)
    defineField({
      name: 'callToAction',
      title: 'Call to Action Button',
      type: 'button',
      fieldset: 'cta',
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
