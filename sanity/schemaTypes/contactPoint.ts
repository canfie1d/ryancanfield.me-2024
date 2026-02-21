import { defineType, defineField } from 'sanity'

export const contactPoint = defineType({
  name: 'contactPoint',
  title: 'Contact Point',
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'e.g. "button"',
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      options: {
        list: [
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Twitter', value: 'twitter' },
        ],
      },
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
