import {defineArrayMember, defineField, defineType} from 'sanity'

// Existing fields keep their names, so current documents and the live site are
// unaffected. `techStack` is the new reference to `technology`; the old
// `technologies` field (to `skill`) stays until the new site launches.
export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'companyImage',
      title: 'Company logo',
      type: 'image',
      options: {hotspot: true},
      description: 'Shown beside the company name, so no alt text is needed.',
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'dateStarted',
      title: 'Started',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isCurrentlyWorkingHere',
      title: 'Current role',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dateEnded',
      title: 'Ended',
      type: 'date',
      description: 'Leave empty for a current role.',
      hidden: ({parent}) => Boolean(parent?.isCurrentlyWorkingHere),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences on what the role was and what you owned.',
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'points',
      title: 'Achievements',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'teamSize',
      title: 'Team size',
      type: 'number',
      validation: (r) => r.integer().min(1),
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
  ],
  orderings: [
    {
      title: 'Started, newest first',
      name: 'dateStartedDesc',
      by: [{field: 'dateStarted', direction: 'desc'}],
    },
  ],
  preview: {select: {title: 'jobTitle', subtitle: 'company', media: 'companyImage'}},
})
