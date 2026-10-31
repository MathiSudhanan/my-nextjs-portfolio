import {defineArrayMember, defineField, defineType} from 'sanity'
import {altTextField, captionField, creditField, decorativeField} from '../fields'

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'What was measured', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'before', title: 'Before', type: 'string', description: 'For example: 1.8 s'}),
    defineField({name: 'after', title: 'After', type: 'string', description: 'For example: 240 ms'}),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where the number comes from (monitoring tool, report, period).',
      validation: (r) => r.required().warning('A source makes the number credible.'),
    }),
  ],
  preview: {
    select: {title: 'label', before: 'before', after: 'after'},
    prepare: ({title, before, after}) => ({title, subtitle: [before, after].filter(Boolean).join(' → ')}),
  },
})

export const decisionRecord = defineType({
  name: 'decisionRecord',
  title: 'Decision record',
  type: 'object',
  description: 'An architecture decision: what was decided, why, and what was rejected.',
  fields: [
    defineField({name: 'code', title: 'Code', type: 'string', description: 'For example: ADR-03'}),
    defineField({name: 'title', title: 'Decision', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'context', title: 'Context', type: 'text', rows: 3}),
    defineField({name: 'decision', title: 'What was decided and why', type: 'text', rows: 4}),
    defineField({name: 'consequences', title: 'Consequences', type: 'text', rows: 3}),
    defineField({
      name: 'rejected',
      title: 'Rejected options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'rejectedOption',
          fields: [
            defineField({name: 'option', title: 'Option', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'reason', title: 'Why not', type: 'string'}),
          ],
          preview: {select: {title: 'option', subtitle: 'reason'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'code'}},
})

export const tradeOff = defineType({
  name: 'tradeOff',
  title: 'Trade-off',
  type: 'object',
  fields: [
    defineField({name: 'choice', title: 'Choice', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'gained', title: 'What we gained', type: 'string'}),
    defineField({name: 'gaveUp', title: 'What we gave up', type: 'string'}),
  ],
  preview: {select: {title: 'choice', subtitle: 'gained'}},
})

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {list: [{title: 'Note', value: 'note'}, {title: 'Warning', value: 'warning'}], layout: 'radio'},
      initialValue: 'note',
    }),
    defineField({name: 'body', title: 'Text', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'body', subtitle: 'tone'}},
})

export const codeSnippet = defineType({
  name: 'codeSnippet',
  title: 'Code snippet',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: ['csharp', 'java', 'typescript', 'javascript', 'sql', 'json', 'yaml', 'bash', 'text'],
      },
      initialValue: 'typescript',
    }),
    defineField({name: 'filename', title: 'File name', type: 'string'}),
    defineField({name: 'code', title: 'Code', type: 'text', rows: 10, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'filename', subtitle: 'language'}},
})

/**
 * The shared rich text. Only h3 and h4 exist, because the page template owns the
 * h1 and h2, so the heading outline stays correct.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h3'},
        {title: 'Subheading', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (r) => r.required().uri({scheme: ['https', 'mailto']}),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      name: 'figure',
      title: 'Figure',
      options: {hotspot: true},
      fields: [altTextField, decorativeField, captionField, creditField],
    }),
    defineArrayMember({
      type: 'image',
      name: 'diagram',
      title: 'Architecture diagram',
      description: 'Upload an SVG or PNG. Both alt text and a text description are required.',
      fields: [
        defineField({...altTextField, validation: (r) => r.required()}),
        defineField({
          name: 'description',
          title: 'Text description',
          type: 'text',
          rows: 4,
          description: 'Describe the flow in words, for people who cannot see the diagram.',
          validation: (r) => r.required(),
        }),
        captionField,
      ],
    }),
    defineArrayMember({type: 'decisionRecord'}),
    defineArrayMember({type: 'callout'}),
    defineArrayMember({type: 'codeSnippet'}),
  ],
})
