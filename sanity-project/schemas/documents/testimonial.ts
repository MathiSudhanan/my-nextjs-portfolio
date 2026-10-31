import {defineField, defineType} from 'sanity'
import {imageField} from '../fields'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  description: 'Only with written permission from the person quoted.',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({
      name: 'permission',
      title: 'I have written permission to publish this',
      type: 'boolean',
      initialValue: false,
      validation: (r) =>
        r.custom((value) =>
          value === true ? true : 'You need permission before this can be published',
        ),
    }),
    defineField({
      name: 'caseStudy',
      title: 'Related case study',
      type: 'reference',
      to: [{type: 'caseStudy'}],
    }),
    imageField({name: 'photo', title: 'Photo'}),
  ],
  preview: {select: {title: 'name', subtitle: 'company', media: 'photo'}},
})
