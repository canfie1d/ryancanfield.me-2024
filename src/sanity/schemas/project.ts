import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'link', type: 'url', title: 'External Link' }),
    defineField({ name: 'url', type: 'string', title: 'Internal URL Path' }),
    defineField({ name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'image', type: 'image', title: 'Thumbnail Image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
