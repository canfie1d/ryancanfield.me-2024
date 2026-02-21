import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL',
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'length',
      type: 'string',
      description: 'e.g. "2 min read"',
    }),
  ],
})
