import {defineField, defineType} from 'sanity'
import {yearField} from '../fields'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  description: 'Only add credentials worth showing.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'issuer', title: 'Issuer', type: 'string', validation: (r) => r.required()}),
    yearField('year', 'Year earned'),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({name: 'badge', title: 'Badge', type: 'image'}),
  ],
  preview: {select: {title: 'name', subtitle: 'issuer', media: 'badge'}},
})
