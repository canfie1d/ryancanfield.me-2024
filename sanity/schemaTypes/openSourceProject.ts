import { defineType, defineField } from 'sanity'

export const openSourceProject = defineType({
  name: 'openSourceProject',
  title: 'Open Source Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'githubUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'npmUrl',
      type: 'url',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
  ],
})
