import { defineField, defineType } from 'sanity'

export const openSource = defineType({
  name: 'openSource',
  title: 'Open Source Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'githubUrl', type: 'url', title: 'GitHub URL' }),
    defineField({ name: 'npmUrl', type: 'url', title: 'npm URL' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
