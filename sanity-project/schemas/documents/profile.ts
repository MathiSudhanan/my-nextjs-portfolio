import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField, yearField} from '../fields'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  description: 'Who you are: hero copy, about story and leadership. There is exactly one of these.',
  fields: [
    defineField({
      name: 'headline',
      title: 'Hero headline',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'subheadline',
      title: 'Hero subline',
      type: 'string',
      validation: (r) => r.max(80),
    }),
    defineField({
      name: 'positioning',
      title: 'Positioning statement',
      type: 'text',
      rows: 3,
      description: 'Two or three sentences: who you are, the stacks you lead, the differentiator.',
      validation: (r) => r.max(400),
    }),
    {
      ...yearField(
        'startYear',
        'Career start year',
        'Used to compute "20+ years" so the number never goes stale.',
      ),
      validation: (r) => r.required().integer().min(1980).max(new Date().getFullYear()),
    },
    defineField({name: 'aboutStory', title: 'About story', type: 'richText'}),
    defineField({
      name: 'leadership',
      title: 'How I lead',
      type: 'array',
      description: 'Four short statements, each with a real example.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'leadershipStatement',
          fields: [
            defineField({
              name: 'title',
              title: 'Statement',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({name: 'story', title: 'Example', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'title', subtitle: 'story'}},
        }),
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'careerPath',
      title: 'Career path',
      type: 'array',
      description:
        'The stages of your career, oldest first. The Path section on the home page appears once there are at least two.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'careerStage',
          fields: [
            defineField({
              name: 'years',
              title: 'Years',
              type: 'string',
              description: 'For example: 2005–2011, or 2019–now',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'For example: Engineer, Tech lead, Architect',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'practice',
              title: 'Martial arts stage (optional)',
              type: 'string',
              description:
                'A short label from your own training, for example Meithari or Kolthari. Use your lineage’s spelling.',
            }),
            defineField({
              name: 'lesson',
              title: 'Lesson',
              type: 'text',
              rows: 3,
              description: 'One or two sentences about what this stage taught you.',
              validation: (r) => r.max(220),
            }),
          ],
          preview: {select: {title: 'role', subtitle: 'years'}},
        }),
      ],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: 'martialArtsIntro',
      title: 'Martial arts introduction',
      type: 'text',
      rows: 4,
      description: 'Opens the Martial Arts page. Tie it to an engineering behaviour.',
    }),
    imageField({name: 'portrait', title: 'Portrait', required: true, caption: true, credit: true}),
    imageField({
      name: 'heroImage',
      title: 'Hero image',
      description: 'The Silambam stance photograph. Portrait orientation with room for text.',
      caption: true,
      credit: true,
    }),
    defineField({
      name: 'featuredCaseStudies',
      title: 'Featured case studies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})],
      validation: (r) => r.max(3).unique(),
    }),
  ],
  preview: {select: {title: 'headline', media: 'portrait'}},
})
