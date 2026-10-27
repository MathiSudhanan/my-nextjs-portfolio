import {defineArrayMember, defineField} from 'sanity'

/**
 * Accessibility: every content image needs alt text, or an explicit "decorative"
 * flag. The site renders alt="" for decorative images.
 */
export const altTextField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description:
    'Describe what the image shows, for people using screen readers. Leave empty only if the image is decorative.',
  validation: (rule) =>
    rule.custom((value, context) => {
      const parent = context.parent as {decorative?: boolean} | undefined
      if (parent?.decorative || value) return true
      return 'Add alt text, or tick "Decorative"'
    }),
})

export const decorativeField = defineField({
  name: 'decorative',
  title: 'Decorative',
  type: 'boolean',
  description: 'Tick if the image adds no information (it will be hidden from screen readers).',
  initialValue: false,
})

export const captionField = defineField({name: 'caption', title: 'Caption', type: 'string'})
export const creditField = defineField({name: 'credit', title: 'Photo credit', type: 'string'})

type ImageFieldOptions = {
  name: string
  title: string
  description?: string
  required?: boolean
  caption?: boolean
  credit?: boolean
}

/** A hotspot-enabled image with alt text. */
export function imageField({
  name,
  title,
  description,
  required,
  caption,
  credit,
}: ImageFieldOptions) {
  return defineField({
    name,
    title,
    description,
    type: 'image',
    options: {hotspot: true},
    fields: [
      altTextField,
      decorativeField,
      ...(caption ? [captionField] : []),
      ...(credit ? [creditField] : []),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })
}

/** An image for use inside an array. */
export function imageMember({caption = true, credit = false} = {}) {
  return defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [
      altTextField,
      decorativeField,
      ...(caption ? [captionField] : []),
      ...(credit ? [creditField] : []),
    ],
  })
}

export const slugField = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  description: 'The URL segment. Generated from the title; keep it short.',
  options: {source: 'title', maxLength: 80},
  validation: (rule) => rule.required(),
})

/** Years are stored as numbers so the site can compute durations that never go stale. */
export function yearField(name: string, title: string, description?: string) {
  const current = new Date().getFullYear()
  return defineField({
    name,
    title,
    description,
    type: 'number',
    validation: (rule) => rule.integer().min(1980).max(current),
  })
}
