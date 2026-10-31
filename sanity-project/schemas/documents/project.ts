import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageMember, slugField, yearField} from '../fields'

// Existing fields keep their names, so current documents and the live site are
// unaffected. New fields are added beside them; `linkToBuild` and `technologies`
// stay (deprecated) until the new site launches.
export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  description: 'Smaller work shown in a compact list. Flagship work belongs in a case study.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({name: 'role', title: 'Your role', type: 'string'}),
    yearField('year', 'Year'),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        defineField({
          name: 'live',
          title: 'Live site',
          type: 'url',
          validation: (r) => r.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'repo',
          title: 'Source code',
          type: 'url',
          validation: (r) => r.uri({scheme: ['https']}),
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [imageMember()],
    }),
    defineField({
      name: 'techStack',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'technology'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies (old skills)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'skill'}]})],
      deprecated: {reason: 'Use "Technologies" above. This stays until the new site launches.'},
    }),
    defineField({
      name: 'linkToBuild',
      title: 'Link to build (old)',
      type: 'url',
      deprecated: {reason: 'Use "Links" above. This stays until the new site launches.'},
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'images.0'}},
})
