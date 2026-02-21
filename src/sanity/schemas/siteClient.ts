import { defineField, defineType } from 'sanity'

export const siteClient = defineType({
  name: 'siteClient',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Company Name' }),
    defineField({ name: 'url', type: 'url', title: 'Website URL' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
