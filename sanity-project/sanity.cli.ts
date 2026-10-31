import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'lx7gopy9',
    dataset: 'production',
  },
  // The hosted Studio's application id, so `sanity deploy` does not prompt for it.
  deployment: {
    appId: 'btmtsgvpa6edpunk2sry4j8y',
  },
  // Generates ../src/sanity.types.ts from schema.json and the GROQ in src/lib and src/features.
  typegen: {
    path: '../src/{lib,features}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
