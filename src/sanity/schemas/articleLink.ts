import { defineField, defineType } from 'sanity'

export const articleLink = defineType({
  name: 'articleLink',
  title: 'Article Link',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'imageUrl', type: 'url', title: 'Image URL' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'url', type: 'url', title: 'Article URL' }),
    defineField({ name: 'length', type: 'string', title: 'Read Time (e.g. "4 min read")' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
