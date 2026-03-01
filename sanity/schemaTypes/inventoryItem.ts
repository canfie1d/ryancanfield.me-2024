import { defineType, defineField } from 'sanity'

export const inventoryItem = defineType({
  name: 'inventoryItem',
  title: 'Inventory Item',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Unique slug (e.g. note, key, code)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Display Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      description: 'Icon name from design system',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'useContent',
      type: 'text',
      title: 'Use Content',
      description: 'Content shown when item is used/read',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addOnFor',
      type: 'string',
      title: 'Add-on For',
      description: 'If set, this item is an add-on for another item (e.g. jewel for sword)',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Display order',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
