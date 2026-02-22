import { defineType, defineField } from 'sanity'

export const theme = defineType({
  name: 'theme',
  title: 'Theme',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Unique slug (sampico, kim, léon, random, custom, eryndor)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'displayName',
      type: 'string',
      title: 'Display Name',
      description: 'Name shown in theme picker (defaults to id if empty)',
    }),
    defineField({
      name: 'backgroundColors',
      type: 'array',
      title: 'Background Colors',
      description: 'Array of 5 hex strings (for fixed-color themes only)',
      of: [{ type: 'string' }],
      validation: (rule) => rule.length(5),
    }),
    defineField({
      name: 'textColors',
      type: 'array',
      title: 'Text Colors',
      description: 'Array of 5 hex strings',
      of: [{ type: 'string' }],
      validation: (rule) => rule.length(5),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Display order in theme menu',
    }),
    defineField({
      name: 'unlockable',
      type: 'boolean',
      title: 'Unlockable',
      description: 'Requires achievement to show (e.g. eryndor)',
      initialValue: false,
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
