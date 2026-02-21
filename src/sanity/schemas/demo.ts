import { defineField, defineType } from 'sanity'

export const demo = defineType({
  name: 'demo',
  title: 'CodePen Demo',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'codepenId', type: 'string', title: 'CodePen ID' }),
    defineField({ name: 'image', type: 'image', title: 'Preview Image', options: { hotspot: true } }),
    defineField({ name: 'hearts', type: 'string', title: 'Heart Count' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
