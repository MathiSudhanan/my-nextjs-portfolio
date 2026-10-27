import {defineArrayMember, defineField, defineType} from 'sanity'

// Legacy. Read by the current live site only. Replaced by "Site settings" and
// "Profile"; phoneNumber and address are intentionally not carried over.
export default defineType({
  name: 'pageInfo',
  title: 'Page info (legacy)',
  type: 'document',
  description: 'Used by the current live site until the new site launches. Do not add new content here.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'heroImage', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'backgroundInformation', title: 'Background information', type: 'string'}),
    defineField({name: 'profilePic', title: 'Profile picture', type: 'image', options: {hotspot: true}}),
    defineField({name: 'phoneNumber', title: 'Phone number', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'string'}),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'social'}]})],
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'profilePic'}},
})
