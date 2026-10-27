import {defineField, defineType} from 'sanity'

// Legacy. Read by the current live site only. Replaced by "Technology".
export default defineType({
  name: 'skill',
  title: 'Skill (legacy)',
  type: 'document',
  description: 'Used by the current live site until the new site launches. Replaced by Technology.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'progress',
      title: 'Progress',
      type: 'number',
      description: 'Progress of skill from 0 to 100%',
      validation: (r) => r.min(0).max(100),
    }),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'name', subtitle: 'progress', media: 'image'}},
})
