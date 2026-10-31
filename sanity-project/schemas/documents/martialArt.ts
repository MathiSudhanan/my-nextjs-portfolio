import {defineField, defineType} from 'sanity'
import {imageMember, slugField, yearField} from '../fields'

export default defineType({
  name: 'martialArt',
  title: 'Martial art',
  type: 'document',
  description: 'Kung Fu, Kalaripayattu and Silambam. Tie each one to an engineering behaviour.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    {...slugField, options: {source: 'name', maxLength: 60}},
    defineField({
      name: 'nativeName',
      title: 'Name in its own script',
      type: 'string',
      description: 'For example: சிலம்பம், കളരിപ്പയറ്റ്, 功夫',
    }),
    yearField('startYear', 'Year you started', 'Years of practice are computed from this.'),
    defineField({name: 'school', title: 'School or lineage', type: 'string'}),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(240),
    }),
    defineField({name: 'whatItDemands', title: 'What the training demands', type: 'text', rows: 3}),
    defineField({name: 'whatItTaught', title: 'What it taught me', type: 'text', rows: 3}),
    defineField({
      name: 'engineeringParallel',
      title: 'Where this shows up in engineering',
      type: 'text',
      rows: 3,
      description: 'One concrete behaviour. Without this the reference reads as a gimmick.',
      validation: (r) => r.required(),
    }),
    defineField({name: 'body', title: 'Story', type: 'richText'}),
    defineField({
      name: 'gallery',
      title: 'Photographs',
      type: 'array',
      of: [imageMember({credit: true})],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'nativeName'}},
})
