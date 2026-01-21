import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'

import {
  filteredDocumentListItems,
  singletonDocumentListItems,
  singletonTools,
} from 'sanity-plugin-singleton-management'
import {lucideIconPicker} from 'sanity-plugin-lucide-icon-picker'
import {media} from 'sanity-plugin-media'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'sanity-template-sveltekit-clean',
  title: 'CMS for Niko - Trust Your Mind',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Singletons')
          .items([
            ...singletonDocumentListItems({S, context}),
            S.divider(),
            ...filteredDocumentListItems({S, context}),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    visionTool(),
    singletonTools(),
    lucideIconPicker(),
    media(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
