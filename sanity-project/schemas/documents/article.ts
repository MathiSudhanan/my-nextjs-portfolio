import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, slugField} from '../fields'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  description:
    'Essays and architecture decision records. The Articles section stays hidden until three are published.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required().max(90),
    }),
    slugField,
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          {title: 'Essay', value: 'essay'},
          {title: 'Decision record', value: 'adr'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    imageField({name: 'cover', title: 'Cover image', caption: true}),
    defineField({name: 'body', title: 'Body', type: 'richText', validation: (r) => r.required()}),
    defineField({
      name: 'techStack',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'technology'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'relatedCaseStudy',
      title: 'Related case study',
      type: 'reference',
      to: [{type: 'caseStudy'}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'kind', media: 'cover'}},
})
