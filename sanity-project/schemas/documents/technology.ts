import {defineField, defineType} from 'sanity'
import {yearField} from '../fields'

export default defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  description:
    'A technology you have used professionally. Replaces the old Skill type; there is no percentage.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Language', value: 'language'},
          {title: 'Framework or library', value: 'framework'},
          {title: 'Data and messaging', value: 'data'},
          {title: 'Cloud and delivery', value: 'cloud'},
          {title: 'Practice and tooling', value: 'practice'},
        ],
      },
      validation: (r) => r.required(),
    }),
    yearField(
      'since',
      'First used (year)',
      'The year you first used it professionally. Years of experience are computed from this.',
    ),
    defineField({
      name: 'level',
      title: 'Depth',
      type: 'string',
      options: {
        list: [
          {title: 'Core: daily use, deep', value: 'core'},
          {title: 'Working: shipped with it', value: 'working'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required().warning('Set this so the capability map can group it.'),
    }),
    defineField({name: 'featured', title: 'Show prominently', type: 'boolean', initialValue: false}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional. The name is always shown beside it, so no alt text is needed.',
    }),
  ],
  orderings: [{title: 'Name', name: 'name', by: [{field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'category', media: 'icon'}},
})
