import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {legacyTypes, schemaTypes, singletonTypes} from './schemas'
import {structure} from './structure'

const singletons = new Set<string>(singletonTypes)
const legacy = new Set<string>(legacyTypes)

export default defineConfig({
  name: 'default',
  title: 'Mathi Sudhanan',

  projectId: 'lx7gopy9',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Singletons and legacy types are not offered in "create new".
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletons.has(schemaType) && !legacy.has(schemaType)),
  },

  document: {
    // Singletons cannot be deleted, duplicated or unpublished.
    actions: (input, {schemaType}) =>
      singletons.has(schemaType)
        ? input.filter(({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : input,
  },
})
