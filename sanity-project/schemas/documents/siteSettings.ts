import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  description: 'Facts that appear across the whole site. There is exactly one of these.',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'email',
      title: 'Public email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      description: 'City and timezone only. Do not add a street address.',
      fields: [
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          description: 'For example: IST (UTC+5:30)',
        }),
      ],
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'object',
      description: 'Shown in the hero. Leave empty to show nothing.',
      fields: [
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {
            list: [
              {title: 'Open to roles and consulting', value: 'available'},
              {title: 'Booking from a date', value: 'booking'},
              {title: 'Not available', value: 'unavailable'},
            ],
          },
        }),
        defineField({name: 'from', title: 'Available from', type: 'date'}),
        defineField({
          name: 'targetRoles',
          title: 'Target roles',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({name: 'note', title: 'Note', type: 'string'}),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'title',
              title: 'Label',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r) => r.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
    defineField({name: 'seo', title: 'Default SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
