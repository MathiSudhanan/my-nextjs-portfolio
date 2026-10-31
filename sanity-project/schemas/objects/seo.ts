import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Optional. Leave empty to use the page title and summary.',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Title',
      type: 'string',
      description: 'Up to 60 characters.',
      validation: (rule) => rule.max(60).warning('Titles over 60 characters are cut off in search.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Up to 160 characters.',
      validation: (rule) =>
        rule.max(160).warning('Descriptions over 160 characters are cut off in search.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social sharing image',
      type: 'image',
      description: '1200 x 630. If empty, an image is generated from the title.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
