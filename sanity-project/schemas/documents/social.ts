import {defineField, defineType} from 'sanity'

// Legacy. Read by the current live site only. Social links now live in
// "Site settings".
export default defineType({
  name: 'social',
  title: 'Social (legacy)',
  type: 'document',
  description: 'Used by the current live site until the new site launches. Replaced by Site settings.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
  ],
  preview: {select: {title: 'title', subtitle: 'url'}},
})
