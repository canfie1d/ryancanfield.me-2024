import { defineField, defineType } from 'sanity'

export const contactPoint = defineType({
  name: 'contactPoint',
  title: 'Contact Point',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'url', type: 'url', title: 'URL' }),
    defineField({ name: 'type', type: 'string', title: 'Type (e.g. "button")' }),
    defineField({
      name: 'icon', type: 'string', title: 'Icon Name',
      options: { list: ['github', 'linkedin', 'twitter'] }
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
