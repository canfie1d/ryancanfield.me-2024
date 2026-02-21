import { defineField, defineType } from 'sanity'

export const recommendation = defineType({
  name: 'recommendation',
  title: 'Recommendation',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'company', type: 'string', title: 'Company' }),
    defineField({ name: 'position', type: 'string', title: 'Position' }),
    defineField({ name: 'message', type: 'array', title: 'Message (one paragraph per item)', of: [{ type: 'text' }] }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
