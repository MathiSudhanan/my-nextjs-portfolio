import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'lx7gopy9',
    dataset: 'production',
  },
  // Generates ../src/sanity.types.ts from schema.json and the GROQ in src/lib and src/features.
  typegen: {
    path: '../src/{lib,features}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
