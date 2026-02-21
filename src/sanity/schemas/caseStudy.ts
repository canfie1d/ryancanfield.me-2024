import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'id', type: 'slug', title: 'ID (slug)', options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
    defineField({ name: 'path', type: 'string', title: 'URL Path (e.g. /work/freightweb)' }),
    defineField({ name: 'link', type: 'url', title: 'External Link' }),
    defineField({
      name: 'problem',
      type: 'object',
      title: 'Problem',
      fields: [
        defineField({ name: 'content', type: 'array', title: 'Content', of: [{ type: 'text' }] }),
        defineField({
          name: 'images', type: 'array', title: 'Images',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
              defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            ]
          }]
        }),
      ]
    }),
    defineField({
      name: 'solution',
      type: 'object',
      title: 'Solution',
      fields: [
        defineField({ name: 'content', type: 'array', title: 'Content', of: [{ type: 'text' }] }),
        defineField({
          name: 'images', type: 'array', title: 'Images',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
              defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            ]
          }]
        }),
      ]
    }),
    defineField({
      name: 'result',
      type: 'object',
      title: 'Result',
      fields: [
        defineField({ name: 'content', type: 'array', title: 'Content', of: [{ type: 'text' }] }),
        defineField({
          name: 'images', type: 'array', title: 'Images',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
              defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            ]
          }]
        }),
      ]
    }),
    defineField({
      name: 'additionalImages',
      type: 'array',
      title: 'Additional Images',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
          defineField({ name: 'caption', type: 'string', title: 'Caption' }),
        ]
      }]
    }),
    defineField({ name: 'videoUrl', type: 'url', title: 'Video URL' }),
    defineField({
      name: 'videoPoster',
      type: 'image',
      title: 'Video Poster Image',
      options: { hotspot: true }
    }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
